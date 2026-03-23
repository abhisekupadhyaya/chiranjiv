import json
from decimal import Decimal
import boto3

# Reuse DynamoDB client across invocations
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("chiranjivSignup")

# CORS headers – adjust Origin if you want to lock it down
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
}


def _to_int(value, default=0):
    if value is None:
        return default
    if isinstance(value, int):
        return value
    if isinstance(value, Decimal):
        return int(value)
    try:
        return int(value)
    except Exception:
        return default


def _is_verified(item):
    """Treat missing emailVerified as verified (backward compatibility)."""
    verified = item.get("emailVerified")
    # None/missing = backward compat, count as verified
    if verified is None:
        return True
    # Explicit False or string "false" = unverified
    if verified is False:
        return False
    if isinstance(verified, str) and verified.lower() == "false":
        return False
    # True or string "true" = verified
    return True


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
    Returns the user's rank and total user count.

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
        body = _parse_body(event)
        user_id = body.get("id")
        if not user_id:
            return {
                "statusCode": 400,
                "headers": CORS_HEADERS,
                "body": json.dumps({"message": "Missing required field: id"}),
            }

        # PASS 1: Scan entire table and collect all items
        all_items = []
        last_evaluated_key = None
        target_referrals = None
        target_created_at = None
        target_referral_code = None
        found_user = False

        while True:
            if last_evaluated_key:
                resp = table.scan(
                    ProjectionExpression="id, referralsCount, createdAt, referralCode, emailVerified",
                    ExclusiveStartKey=last_evaluated_key,
                )
            else:
                resp = table.scan(
                    ProjectionExpression="id, referralsCount, createdAt, referralCode, emailVerified"
                )

            items = resp.get("Items", [])
            for item in items:
                # Skip unverified users
                if not _is_verified(item):
                    continue
                
                item_id = item.get("id")
                item_referrals = _to_int(item.get("referralsCount"), 0)
                item_created_at = _to_int(item.get("createdAt"), 0)
                item_referral_code = item.get("referralCode")
                
                # Store item in list
                all_items.append({
                    "id": item_id,
                    "referralsCount": item_referrals,
                    "createdAt": item_created_at,
                    "referralCode": item_referral_code
                })
                
                # If this is the target user, save their values
                if item_id == user_id:
                    found_user = True
                    target_referrals = item_referrals
                    target_created_at = item_created_at
                    target_referral_code = item_referral_code

            last_evaluated_key = resp.get("LastEvaluatedKey")
            if not last_evaluated_key:
                break

        # Check if user was found
        if not found_user:
            return {
                "statusCode": 404,
                "headers": CORS_HEADERS,
                "body": json.dumps({"message": f"User not found: {user_id}"}),
            }

        # Total users
        total_users = len(all_items)

        # PASS 2: Calculate rank using exact same logic as calculate_rank.py
        num_above = 0
        for item in all_items:
            item_id = item["id"]
            item_referrals = item["referralsCount"]
            item_created_at = item["createdAt"]
            
            # Skip the target user
            if item_id == user_id:
                continue
            
            # Count users that rank above the target user
            # Using the exact logic from calculate_rank.py (lines 139-150)
            if (
                (item_referrals > target_referrals)
                or (
                    item_referrals == target_referrals
                    and item_created_at < target_created_at
                )
                or (
                    item_referrals == target_referrals
                    and item_created_at == target_created_at
                    and str(item_id) < str(user_id)
                )
            ):
                num_above += 1

        rank = num_above + 1
        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps(
                {
                    "id": user_id,
                    "rank": rank,
                    "totalUsers": total_users,
                    "referralsCount": target_referrals,
                    "referralCode": target_referral_code,
                }
            ),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps(
                {"message": "Internal server error", "error": str(e)}
            ),
        }
