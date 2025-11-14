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

        # Attempt a direct get (works if table primary key is HASH on id)
        target_item = None
        try:
            get_resp = table.get_item(
                Key={"id": user_id},
                ProjectionExpression="id, referralsCount, createdAt, referralCode",
            )
            target_item = get_resp.get("Item")
        except Exception:
            target_item = None

        target_referrals = None
        target_created_at = None
        target_referral_code = None
        if target_item:
            target_referrals = _to_int(target_item.get("referralsCount"), 0)
            target_created_at = _to_int(target_item.get("createdAt"), 0)
            target_referral_code = target_item.get("referralCode")

        # Scan the table to compute rank and total users
        last_evaluated_key = None
        total_users = 0
        num_above = 0
        found_user = target_item is not None

        while True:
            if last_evaluated_key:
                resp = table.scan(
                    ProjectionExpression="id, referralsCount, createdAt, referralCode",
                    ExclusiveStartKey=last_evaluated_key,
                )
            else:
                resp = table.scan(
                    ProjectionExpression="id, referralsCount, createdAt, referralCode"
                )

            items = resp.get("Items", [])
            for item in items:
                item_id = item.get("id")
                item_count = _to_int(item.get("referralsCount"), 0)
                item_created_at = _to_int(item.get("createdAt"), 0)
                total_users += 1

                if item_id == user_id:
                    found_user = True
                    if target_referrals is None:
                        target_referrals = item_count
                    if target_created_at is None:
                        target_created_at = item_created_at
                    if target_referral_code is None:
                        target_referral_code = item.get("referralCode")
                    continue

                if target_referrals is not None and target_created_at is not None:
                    if (
                        (item_count > target_referrals)
                        or (
                            item_count == target_referrals
                            and item_created_at < target_created_at
                        )
                        or (
                            item_count == target_referrals
                            and item_created_at == target_created_at
                            and item_id is not None
                            and user_id is not None
                            and str(item_id) < str(user_id)
                        )
                    ):
                        num_above += 1

            last_evaluated_key = resp.get("LastEvaluatedKey")
            if not last_evaluated_key:
                break

        if not found_user:
            return {
                "statusCode": 404,
                "headers": CORS_HEADERS,
                "body": json.dumps({"message": f"User not found: {user_id}"}),
            }

        target_referrals = _to_int(target_referrals, 0)
        target_created_at = _to_int(target_created_at, 0)

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
