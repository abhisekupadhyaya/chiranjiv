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
    "Access-Control-Allow-Methods": "OPTIONS,GET",
}


def _to_int(value, default=0):
    """
    Safely convert a value (which might be Decimal, int, or None) to an integer.
    """
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
    return verified is not False


def lambda_handler(event, context):
    """
    Returns total registered users and total referrals count across all users.

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
        # Initialize counters
        total_users = 0
        total_referrals = 0

        # Scan the table with pagination
        last_evaluated_key = None

        while True:
            if last_evaluated_key:
                resp = table.scan(
                    ProjectionExpression="id, referralsCount, emailVerified",
                    ExclusiveStartKey=last_evaluated_key,
                )
            else:
                resp = table.scan(
                    ProjectionExpression="id, referralsCount, emailVerified"
                )

            items = resp.get("Items", [])
            for item in items:
                # Skip unverified users
                if not _is_verified(item):
                    continue
                
                total_users += 1
                referrals_count = _to_int(item.get("referralsCount"), 0)
                total_referrals += referrals_count

            last_evaluated_key = resp.get("LastEvaluatedKey")
            if not last_evaluated_key:
                break

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps(
                {
                    "totalUsers": total_users,
                    "totalReferrals": total_referrals,
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

