import json
import os
import random
import re
import string
import uuid
from datetime import datetime, timezone

import bcrypt
import psycopg

DATABASE_URL = os.getenv("DATABASE_URL")

_conn = None


def _get_conn():
    global _conn
    if not DATABASE_URL:
        return None
    if _conn is None or _conn.closed:
        _conn = psycopg.connect(DATABASE_URL, autocommit=True)
    return _conn


def _json_response(body: dict, status_code: int = 200):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": os.getenv("CORS_ORIGIN", "*"),
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST",
        },
        "body": json.dumps(body),
    }


def _generate_referral_code(user_id: str) -> str:
    random_part = "".join(random.choices(string.ascii_uppercase + string.digits, k=8))
    user_part = re.sub(r"[^A-Z0-9]", "", (user_id[:8] if user_id else "").upper())
    return f"CHR-{user_part}-{random_part}"


def handler(event, context):
    try:
        if event.get("httpMethod") == "OPTIONS":
            return _json_response({}, 200)

        body = json.loads(event.get("body") or "{}")
        required = ["userId", "password", "addressLine1", "city", "state", "pincode", "privacyPolicy", "termsOfService", "dataUsagePolicy"]
        for key in required:
            if body.get(key) in (None, "", False) and key not in ["addressLine2"]:
                return _json_response({"error": "All required fields must be provided"}, 400)

        if len(body.get("password", "")) < 8:
            return _json_response({"error": "Password must be at least 8 characters"}, 400)

        user_id = body["userId"]

        if not DATABASE_URL:
            mock_ref_code = _generate_referral_code(user_id)
            return _json_response(
                {"success": True, "message": "User information saved successfully (Preview Mode)", "referralCode": mock_ref_code},
                201,
            )

        conn = _get_conn()
        with conn.cursor() as cur:
            # Ensure basic info exists
            cur.execute('SELECT 1 FROM "BasicInfo" WHERE "id" = %s', (user_id,))
            if not cur.fetchone():
                return _json_response({"error": "User not found. Please complete step 1 first."}, 404)

            # Ensure user info not already present
            cur.execute('SELECT 1 FROM "UserInfo" WHERE "userId" = %s', (user_id,))
            if cur.fetchone():
                return _json_response({"error": "User information already exists for this user"}, 409)

            # Hash password
            password_hash = bcrypt.hashpw(body["password"].encode("utf-8"), bcrypt.gensalt(rounds=10)).decode("utf-8")

            # Unique referral code
            attempts = 0
            referral_code = None
            while attempts < 10:
                candidate = _generate_referral_code(user_id)
                cur.execute('SELECT 1 FROM "UserInfo" WHERE "referralCode" = %s', (candidate,))
                if not cur.fetchone():
                    referral_code = candidate
                    break
                attempts += 1
            if referral_code is None:
                return _json_response({"error": "Failed to generate unique referral code. Please try again."}, 500)

            now = datetime.now(tz=timezone.utc)
            cur.execute(
                """
                INSERT INTO "UserInfo" (
                  "id","userId","passwordHash","addressLine1","addressLine2","city","state","pincode",
                  "privacyPolicy","termsOfService","dataUsagePolicy","researchConsent","marketingConsent",
                  "referralCode","createdAt","updatedAt"
                )
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                """,
                (
                    str(uuid.uuid4()),
                    user_id,
                    password_hash,
                    body["addressLine1"].strip(),
                    (body.get("addressLine2") or None),
                    body["city"].strip(),
                    body["state"].strip(),
                    body["pincode"].strip(),
                    bool(body["privacyPolicy"]),
                    bool(body["termsOfService"]),
                    bool(body["dataUsagePolicy"]),
                    bool(body.get("researchConsent", False)),
                    bool(body.get("marketingConsent", False)),
                    referral_code,
                    now,
                    now,
                ),
            )

        return _json_response(
            {"success": True, "message": "User information saved successfully", "referralCode": referral_code},
            201,
        )
    except Exception as e:
        msg = str(e)
        body = {"error": "Internal server error", "details": msg if os.getenv("STAGE", "dev") == "dev" else None}
        return _json_response(body, 500)


