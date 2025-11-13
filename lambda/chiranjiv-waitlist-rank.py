import json
from decimal import Decimal
import boto3

# Reuse DynamoDB client across invocations
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("chiranjivSignup")


def _to_int(value, default=0):
    if value is None:
        return default
    if isinstance(value, (int,)):
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
    Returns the user's rank and total user count based on:
      - referralsCount DESC
      - createdAt ASC (earlier ranks higher) tie-breaker
      - id ASC as final deterministic tie-breaker

    Required IAM:
      - dynamodb:GetItem on table chiranjivSignup
      - dynamodb:Scan on table chiranjivSignup
    """
    try:
        body = _parse_body(event)
        user_id = body.get("id")
        if not user_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"message": "Missing required field: id"}),
            }

        # Attempt a direct get (works if table primary key is HASH on id)
        target_item = None
        try:
            get_resp = table.get_item(Key={"id": user_id}, ProjectionExpression="id, referralsCount, createdAt")
            target_item = get_resp.get("Item")
        except Exception:
            # If table uses a composite key, direct get may fail without sort key.
            # We'll locate the user during the scan below.
            target_item = None

        target_referrals = None
        target_created_at = None
        if target_item:
            target_referrals = _to_int(target_item.get("referralsCount"), 0)
            target_created_at = _to_int(target_item.get("createdAt"), 0)

        # Scan the table to compute rank and total users.
        # We also locate the user during scan if get_item didn't find it.
        last_evaluated_key = None
        total_users = 0
        num_above = 0
        found_user = target_item is not None

        while True:
            if last_evaluated_key:
                resp = table.scan(
                    ProjectionExpression="id, referralsCount, createdAt",
                    ExclusiveStartKey=last_evaluated_key,
                )
            else:
                resp = table.scan(ProjectionExpression="id, referralsCount, createdAt")

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
                    # Do not compare the user against themselves
                    continue

                # Only compute comparisons after we know the target's attributes
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
                "body": json.dumps({"message": f"User not found: {user_id}"}),
            }

        # If target attributes are still missing (shouldn't happen if user was found), default them safely
        target_referrals = _to_int(target_referrals, 0)
        target_created_at = _to_int(target_created_at, 0)

        rank = num_above + 1
        return {
            "statusCode": 200,
            "body": json.dumps(
                {
                    "id": user_id,
                    "rank": rank,
                    "totalUsers": total_users,
                    "referralsCount": target_referrals,
                    "createdAt": target_created_at,
                }
            ),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Internal server error", "error": str(e)}),
        }


