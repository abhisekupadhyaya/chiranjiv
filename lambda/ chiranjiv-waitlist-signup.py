import json
import time
import random
import string
import re
import boto3
from boto3.dynamodb.conditions import Key

# Create DynamoDB resource outside the handler for connection reuse
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('chiranjivSignup')

def _generate_referral_code(user_id: str) -> str:
    random_part = "".join(random.choices(string.ascii_uppercase + string.digits, k=8))
    user_part = re.sub(r"[^A-Z0-9]", "", (user_id[:8] if user_id else "").upper())
    return f"CHR-{user_part}-{random_part}"

def lambda_handler(event, context):
    # Parse JSON body from API Gateway/Lambda Proxy event
    body = {}
    if 'body' in event and event['body']:
        # If body is already a dict (e.g., in tests), skip json.loads
        if isinstance(event['body'], str):
            body = json.loads(event['body'])
        else:
            body = event['body']

    # Get id from request body, e.g. { "id": "user_123" }
    user_id = body.get('id')
    name = body.get('name')
    email = body.get('email')
    phone = body.get('phone')
    address = body.get('address')
    age = body.get('age')
    consentPrivacyPolicy = body.get('consentPrivacyPolicy')
    consentTermsOfService = body.get('consentTermsOfService')
    consentDataUsagePolicy = body.get('consentDataUsagePolicy')
    consentResearchContact = body.get('consentResearchContact')
    consentMarketing = body.get('consentMarketing')
    incomingReferralCode = body.get('referralCode')
    #referredBy = body.get('referredBy')
    isDummy = False
    referralsCount = 0
    referredUserIds = []

    if not user_id:
        # Fallback: generate a simple id if none provided
        return {
            "statusCode": 400,
            "body": json.dumps({
                "message": "Missing required field: id"
            })
        }

    # created_at as a Number (Unix timestamp)
    createdAt = int(time.time())

    # Resolve referrer by querying the GSI with the used referral code
    referrer_id = None
    referrer_createdAt = None
    if incomingReferralCode:
        resp = table.query(
            IndexName='referralCode-index',
            KeyConditionExpression=Key('referralCode').eq(incomingReferralCode),
            ProjectionExpression='id, createdAt'
        )
        if resp.get('Items'):
            first_match = resp['Items'][0]
            referrer_id = first_match.get('id')
            # If the table has a sort key (e.g., createdAt), KEYS_ONLY projection returns it.
            referrer_createdAt = first_match.get('createdAt')

    # Generate a unique referral code for this new user
    attempts = 0
    newReferralCode = None
    while attempts < 10:
        candidate = _generate_referral_code(user_id)
        check = table.query(
            IndexName='referralCode-index',
            KeyConditionExpression=Key('referralCode').eq(candidate),
            ProjectionExpression='id'
        )
        if not check.get('Items'):
            newReferralCode = candidate
            break
        attempts += 1
    if newReferralCode is None:
        return {
            "statusCode": 500,
            "body": json.dumps({
                "message": "Failed to generate unique referral code"
            })
        }

    item = {
        "id": user_id,
        "createdAt": createdAt,
        "name": name,
        "email": email,
        "phone": phone,
        "address": address,
        "age": age,
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
        "referredUserIds": []
    }

    # Put item into DynamoDB
    table.put_item(
        Item=item,
        ConditionExpression='attribute_not_exists(id)'
    )

    # If there is a valid referrer, update their metrics atomically (avoid double counting)
    if referrer_id and referrer_id != user_id:
        # Build the key dynamically to match the table's key schema (HASH only or HASH+RANGE)
        update_key = {'id': referrer_id}
        if referrer_createdAt is not None:
            update_key['createdAt'] = referrer_createdAt
        table.update_item(
            Key=update_key,
            ConditionExpression='attribute_not_exists(referredUserIds) OR NOT contains(referredUserIds, :uid)',
            UpdateExpression=(
                'SET referralsCount = if_not_exists(referralsCount, :zero) + :one, '
                'referredUserIds = list_append(if_not_exists(referredUserIds, :empty), :uid_list)'
            ),
            ExpressionAttributeValues={
                ':zero': 0,
                ':one': 1,
                ':empty': [],
                ':uid_list': [user_id],
                ':uid': user_id,
            }
        )

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Item saved to chiranjiv_signup",
            "item": item,
            "referralCode": newReferralCode
        })
    }