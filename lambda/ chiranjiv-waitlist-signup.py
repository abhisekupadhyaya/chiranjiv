import json
import time
import random
import string
import secrets
import re
import boto3
from boto3.dynamodb.conditions import Key

# Create DynamoDB resource outside the handler for connection reuse
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("chiranjivSignup")

# CORS headers – adjust Origin if you want to lock it down
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
}


def _generate_referral_code(user_id: str, attempt: int = 0) -> str:
    user_part = re.sub(r"[^A-Z0-9]", "", (user_id[:8] if user_id else "").upper())

    if attempt < 5:
        # Standard: 8 random chars
        random_part = "".join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(8))
    elif attempt < 9:
        # High Entropy: 12 random chars
        random_part = "".join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(12))
    else:
        # Guaranteed Unique: Append timestamp (nanoseconds)
        random_part = str(time.time_ns())

    return f"CHR-{user_part}-{random_part}"


def _parse_body(event):
    body = {}
    if "body" in event and event["body"]:
        if isinstance(event["body"], str):
            body = json.loads(event["body"])
        else:
            body = event["body"]
    return body


def lambda_handler(event, context):
    """
    Creates a signup record and handles referral logic.

    Also handles OPTIONS for CORS.
    """

    # 1) Handle CORS preflight directly
    method = (
        event.get("httpMethod")
        or event.get("requestContext", {}).get("http", {}).get("method")
    )

    if method == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps({"message": "ok"}),
        }

    try:
        # Parse JSON body from API Gateway/Lambda Proxy event
        body = _parse_body(event)

        # Get id from request body, e.g. { "id": "user_123" }
        user_id = body.get("id")
        name = body.get("name")
        email = body.get("email")
        phone = body.get("phone")
        address = body.get("address")
        age = body.get("age")
        company = body.get("company")
        consentPrivacyPolicy = body.get("consentPrivacyPolicy")
        consentTermsOfService = body.get("consentTermsOfService")
        consentDataUsagePolicy = body.get("consentDataUsagePolicy")
        consentResearchContact = body.get("consentResearchContact")
        consentMarketing = body.get("consentMarketing")
        incomingReferralCode = body.get("referralCode")

        if not user_id:
            # Fallback: require id (same behavior, but with CORS headers)
            return {
                "statusCode": 400,
                "headers": CORS_HEADERS,
                "body": json.dumps({"message": "Missing required field: id"}),
            }

        # created_at as a Number (Unix timestamp)
        createdAt = int(time.time())

        # Resolve referrer by querying the GSI with the used referral code
        referrer_id = None
        referrer_createdAt = None
        if incomingReferralCode:
            resp = table.query(
                IndexName="referralCode-index",
                KeyConditionExpression=Key("referralCode").eq(incomingReferralCode),
                ProjectionExpression="id, createdAt",
            )
            if resp.get("Items"):
                first_match = resp["Items"][0]
                referrer_id = first_match.get("id")
                # If the table has a sort key (e.g., createdAt), KEYS_ONLY projection returns it.
                referrer_createdAt = first_match.get("createdAt")

        # Generate a unique referral code for this new user
        attempts = 0
        newReferralCode = None
        while attempts < 10:
            candidate = _generate_referral_code(user_id, attempts)
            check = table.query(
                IndexName="referralCode-index",
                KeyConditionExpression=Key("referralCode").eq(candidate),
                ProjectionExpression="id",
            )
            if not check.get("Items"):
                newReferralCode = candidate
                break
            attempts += 1

        if newReferralCode is None:
            return {
                "statusCode": 500,
                "headers": CORS_HEADERS,
                "body": json.dumps(
                    {"message": "Failed to generate unique referral code"}
                ),
            }

        item = {
            "id": user_id,
            "createdAt": createdAt,
            "emailVerified": False,
            "name": name,
            "email": email,
            "phone": phone,
            "address": address,
            "age": age,
            "company": company,
            "consentPrivacyPolicy": consentPrivacyPolicy,
            "consentTermsOfService": consentTermsOfService,
            "consentDataUsagePolicy": consentDataUsagePolicy,
            "consentResearchContact": consentResearchContact,
            "consentMarketing": consentMarketing,
            "referralCode": newReferralCode,
            "usedReferralCode": incomingReferralCode,
            "referredBy": referrer_id,
            "isDummy": False,
            "referralsCount": 0,
            "referredUserIds": [],
        }

        # Put item into DynamoDB
        table.put_item(Item=item, ConditionExpression="attribute_not_exists(id)")

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps(
                {
                    "message": "Item saved to chiranjivSignup",
                    "item": item,
                    "referralCode": newReferralCode,
                }
            ),
        }

    except Exception as e:
        # Catch-all for unexpected errors, with CORS
        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps(
                {"message": "Internal server error", "error": str(e)}
            ),
        }
