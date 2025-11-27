import json
import boto3

ses = boto3.client("ses")

SENDER = "no-reply@chiranjiv.com"   # must be verified in SES
SUBJECT = "Welcome to Chiranjiv"

PLAIN_TEXT_BODY = """Hi {name},

Thank you for registering with us at Chiranjiv!

We're excited to welcome you on your journey toward fitness, longevity, and wellness—powered by genomics. Understanding your genetic makeup unlocks personalized solutions for optimal health.

Share your personal referral link with friends, family, or fitness groups. The more people you invite, the faster you move up the queue! Spread the word to jump the queue for testing and reports on a priority basis. You can keep track of your rank and referrals by logging in.

Our testing begins in Q1, starting with our top-ranking members. Once your name is shortlisted, you’ll receive timely updates and clear guidance as you move through each step.
"""

HTML_BODY = """<html>
  <body>
    <p>Hi {name},</p>

    <p>Thank you for registering with us at <b>Chiranjiv</b>!</p>

    <p>We're excited to welcome you on your journey toward fitness, longevity, and wellness—powered by genomics. Understanding your genetic makeup unlocks personalized solutions for optimal health.</p>

    <p>Share your personal referral link with friends, family, or fitness groups. The more people you invite, the faster you move up the queue! Spread the word to jump the queue for testing and reports on a priority basis. You can keep track of your rank and referrals by logging in.</p>

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
                    "Text": {"Data": PLAIN_TEXT_BODY.format(name=name)},
                    "Html": {"Data": HTML_BODY.format(name=name)},
                },
            },
        )
        print(f"Sent post-confirmation email to {email}")
    except Exception as e:
        # Log the error but don't break the Cognito flow
        print(f"Error sending SES email: {e}")

    # IMPORTANT: must return the *event* object, not a string
    return event
