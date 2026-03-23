import json
import boto3
from boto3.dynamodb.conditions import Key

ses = boto3.client("ses")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("chiranjivSignup")

SENDER = "no-reply@chiranjiv.com"   # must be verified in SES
SUBJECT = "Welcome to Chiranjiv"

SIGNIN_URL = "https://www.chiranjiv.com/signin"

PLAIN_TEXT_BODY = """Hi {name},

Thank you for registering with us at Chiranjiv!

We're excited to welcome you on your journey toward fitness, longevity, and wellness—powered by genomics. Understanding your genetic makeup unlocks personalized solutions for optimal health.

Share your personal referral link with friends, family, or fitness groups. The more people you invite, the faster you move up the queue! Spread the word to jump the queue for testing and reports on a priority basis.

You can keep a track of your position in the queue and referrals here {signin_url}

Our testing begins in Q1, starting with our top-ranking members. Once your name is shortlisted, you’ll receive timely updates and clear guidance as you move through each step.
"""

HTML_BODY = """<html>
  <body>
    <p>Hi {name},</p>

    <p>Thank you for registering with us at <b>Chiranjiv</b>!</p>

    <p>We're excited to welcome you on your journey toward fitness, longevity, and wellness—powered by genomics. Understanding your genetic makeup unlocks personalized solutions for optimal health.</p>

    <p>Share your personal referral link with friends, family, or fitness groups. The more people you invite, the faster you move up the queue! Spread the word to jump the queue for testing and reports on a priority basis.</p>

    <p>You can keep a track of your position in the queue and referrals here
      <a href="{signin_url}">{signin_url}</a>
    </p>

    <p>Our testing begins in Q1, starting with our top-ranking members. Once your name is shortlisted, you’ll receive timely updates and clear guidance as you move through each step.</p>
  </body>
</html>
"""


def lambda_handler(event, context):
    # Log the raw event for debugging
    print("Received event:", json.dumps(event))

    # Only handle normal sign-up confirmation
    trigger = event.get("triggerSource")
    if trigger != "PostConfirmation_ConfirmSignUp":
        # Always return the original event
        return event

    user_attrs = event.get("request", {}).get("userAttributes", {})
    email = user_attrs.get("email")

    if not email:
        print("No email attribute found; skipping SES send.")
        return event

    # Try to get a name; fall back to email if not present
    name = (
        user_attrs.get("name")
        or user_attrs.get("given_name")
        or email
    )

    try:
        ses.send_email(
            Source=SENDER,
            Destination={"ToAddresses": [email]},
            Message={
                "Subject": {"Data": SUBJECT},
                "Body": {
                    "Text": {"Data": PLAIN_TEXT_BODY.format(name=name, signin_url=SIGNIN_URL)},
                    "Html": {"Data": HTML_BODY.format(name=name, signin_url=SIGNIN_URL)},
                },
            },
        )
        print(f"Sent post-confirmation email to {email}")
    except Exception as e:
        # Log the error but don't break the Cognito flow
        print(f"Error sending SES email: {e}")

    # Update DynamoDB to mark email as verified (chiranjivSignup.id is the Cognito sub from result.userId on signup)
    sub = user_attrs.get("sub") or event.get("userName")
    if sub:
        try:
            # Query the user by id (partition key) to get the full item
            user_response = table.query(
                KeyConditionExpression=Key("id").eq(sub),
                Limit=1
            )
            items = user_response.get("Items", [])
            user_item = items[0] if items else None
            
            if not user_item:
                print(f"User {sub} not found in chiranjivSignup; skipping DynamoDB update")
            else:
                # Build the proper key for user update
                user_key = {"id": sub}
                if user_item.get("createdAt"):
                    user_key["createdAt"] = user_item["createdAt"]
                
                # Update emailVerified
                table.update_item(
                    Key=user_key,
                    UpdateExpression="SET emailVerified = :verified",
                    ExpressionAttributeValues={":verified": True}
                )
                print(f"Updated emailVerified for user {sub}")
                
                # After updating emailVerified, update the referrer's counts if applicable
                referrer_id = user_item.get("referredBy")
                
                if referrer_id and referrer_id != sub:
                    try:
                        # Query referrer by id (partition key) to get their full item
                        referrer_response = table.query(
                            KeyConditionExpression=Key("id").eq(referrer_id),
                            Limit=1
                        )
                        items = referrer_response.get("Items", [])
                        referrer_item = items[0] if items else None
                        
                        if referrer_item:
                            # Build key for referrer update
                            referrer_key = {"id": referrer_id}
                            if referrer_item.get("createdAt"):
                                referrer_key["createdAt"] = referrer_item["createdAt"]
                            
                            # Update referrer's counts atomically
                            table.update_item(
                                Key=referrer_key,
                                ConditionExpression="attribute_not_exists(referredUserIds) OR (attribute_exists(referredUserIds) AND NOT contains(referredUserIds, :uid))",
                                UpdateExpression=(
                                    "SET referralsCount = if_not_exists(referralsCount, :zero) + :one, "
                                    "referredUserIds = list_append(if_not_exists(referredUserIds, :empty), :uid_list)"
                                ),
                                ExpressionAttributeValues={
                                    ":zero": 0,
                                    ":one": 1,
                                    ":empty": [],
                                    ":uid_list": [sub],
                                    ":uid": sub,
                                },
                            )
                            print(f"Updated referralsCount for referrer {referrer_id}")
                        else:
                            print(f"Referrer {referrer_id} not found in DynamoDB")
                    except Exception as e:
                        print(f"Error updating referrer counts for {sub}: {e}")
                        
        except Exception as e:
            print(f"Error updating DynamoDB for {sub}: {e}")

    # IMPORTANT: must return the *event* object, not a string
    return event
import json
import boto3
from boto3.dynamodb.conditions import Key

ses = boto3.client("ses")
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("chiranjivSignup")

SENDER = "no-reply@chiranjiv.com"   # must be verified in SES
SUBJECT = "Welcome to Chiranjiv"

SIGNIN_URL = "https://www.chiranjiv.com/signin"

PLAIN_TEXT_BODY = """Hi {name},

Thank you for registering with us at Chiranjiv!

We're excited to welcome you on your journey toward fitness, longevity, and wellness—powered by genomics. Understanding your genetic makeup unlocks personalized solutions for optimal health.

Share your personal referral link with friends, family, or fitness groups. The more people you invite, the faster you move up the queue! Spread the word to jump the queue for testing and reports on a priority basis.

You can keep a track of your position in the queue and referrals here {signin_url}

Our testing begins in Q1, starting with our top-ranking members. Once your name is shortlisted, you’ll receive timely updates and clear guidance as you move through each step.
"""

HTML_BODY = """<html>
  <body>
    <p>Hi {name},</p>

    <p>Thank you for registering with us at <b>Chiranjiv</b>!</p>

    <p>We're excited to welcome you on your journey toward fitness, longevity, and wellness—powered by genomics. Understanding your genetic makeup unlocks personalized solutions for optimal health.</p>

    <p>Share your personal referral link with friends, family, or fitness groups. The more people you invite, the faster you move up the queue! Spread the word to jump the queue for testing and reports on a priority basis.</p>

    <p>You can keep a track of your position in the queue and referrals here
      <a href="{signin_url}">{signin_url}</a>
    </p>

    <p>Our testing begins in Q1, starting with our top-ranking members. Once your name is shortlisted, you’ll receive timely updates and clear guidance as you move through each step.</p>
  </body>
</html>
"""


def lambda_handler(event, context):
    # Log the raw event for debugging
    print("Received event:", json.dumps(event))

    # Only handle normal sign-up confirmation
    trigger = event.get("triggerSource")
    if trigger != "PostConfirmation_ConfirmSignUp":
        # Always return the original event
        return event

    user_attrs = event.get("request", {}).get("userAttributes", {})
    email = user_attrs.get("email")

    if not email:
        print("No email attribute found; skipping SES send.")
        return event

    # Try to get a name; fall back to email if not present
    name = (
        user_attrs.get("name")
        or user_attrs.get("given_name")
        or email
    )

    try:
        ses.send_email(
            Source=SENDER,
            Destination={"ToAddresses": [email]},
            Message={
                "Subject": {"Data": SUBJECT},
                "Body": {
                    "Text": {"Data": PLAIN_TEXT_BODY.format(name=name, signin_url=SIGNIN_URL)},
                    "Html": {"Data": HTML_BODY.format(name=name, signin_url=SIGNIN_URL)},
                },
            },
        )
        print(f"Sent post-confirmation email to {email}")
    except Exception as e:
        # Log the error but don't break the Cognito flow
        print(f"Error sending SES email: {e}")

    # Update DynamoDB to mark email as verified (chiranjivSignup.id is the Cognito sub from result.userId on signup)
    sub = user_attrs.get("sub") or event.get("userName")
    if sub:
        try:
            # Query the user by id (partition key) to get the full item
            user_response = table.query(
                KeyConditionExpression=Key("id").eq(sub),
                Limit=1
            )
            items = user_response.get("Items", [])
            user_item = items[0] if items else None
            
            if not user_item:
                print(f"User {sub} not found in chiranjivSignup; skipping DynamoDB update")
            else:
                # Build the proper key for user update
                user_key = {"id": sub}
                if user_item.get("createdAt"):
                    user_key["createdAt"] = user_item["createdAt"]
                
                # Update emailVerified
                table.update_item(
                    Key=user_key,
                    UpdateExpression="SET emailVerified = :verified",
                    ExpressionAttributeValues={":verified": True}
                )
                print(f"Updated emailVerified for user {sub}")
                
                # After updating emailVerified, update the referrer's counts if applicable
                referrer_id = user_item.get("referredBy")
                
                if referrer_id and referrer_id != sub:
                    try:
                        # Query referrer by id (partition key) to get their full item
                        referrer_response = table.query(
                            KeyConditionExpression=Key("id").eq(referrer_id),
                            Limit=1
                        )
                        items = referrer_response.get("Items", [])
                        referrer_item = items[0] if items else None
                        
                        if referrer_item:
                            # Build key for referrer update
                            referrer_key = {"id": referrer_id}
                            if referrer_item.get("createdAt"):
                                referrer_key["createdAt"] = referrer_item["createdAt"]
                            
                            # Update referrer's counts atomically
                            table.update_item(
                                Key=referrer_key,
                                ConditionExpression="attribute_not_exists(referredUserIds) OR (attribute_exists(referredUserIds) AND NOT contains(referredUserIds, :uid))",
                                UpdateExpression=(
                                    "SET referralsCount = if_not_exists(referralsCount, :zero) + :one, "
                                    "referredUserIds = list_append(if_not_exists(referredUserIds, :empty), :uid_list)"
                                ),
                                ExpressionAttributeValues={
                                    ":zero": 0,
                                    ":one": 1,
                                    ":empty": [],
                                    ":uid_list": [sub],
                                    ":uid": sub,
                                },
                            )
                            print(f"Updated referralsCount for referrer {referrer_id}")
                        else:
                            print(f"Referrer {referrer_id} not found in DynamoDB")
                    except Exception as e:
                        print(f"Error updating referrer counts for {sub}: {e}")
                        
        except Exception as e:
            print(f"Error updating DynamoDB for {sub}: {e}")

    # IMPORTANT: must return the *event* object, not a string
    return event
