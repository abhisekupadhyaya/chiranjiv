import json
import os
import re
import uuid
from datetime import datetime, timezone

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


def handler(event, context):
    try:
        if event.get("httpMethod") == "OPTIONS":
            return _json_response({}, 200)

        body = json.loads(event.get("body") or "{}")
        name = (body.get("name") or "").strip()
        email = (body.get("email") or "").strip()
        phone = (body.get("phone") or "").strip()

        if not name or not email or not phone:
            return _json_response({"error": "Name, email, and phone are required"}, 400)

        if not DATABASE_URL:
            mock_user_id = f"preview_{int(datetime.now(tz=timezone.utc).timestamp()*1000):.0f}"
            return _json_response(
                {"success": True, "userId": mock_user_id, "message": "Basic information saved successfully (Preview Mode)"},
                201,
            )

        conn = _get_conn()
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT b."id", b."name", b."phone",
                       EXISTS(SELECT 1 FROM "UserInfo" u WHERE u."userId" = b."id") AS has_user_info
                FROM "BasicInfo" b
                WHERE b."email" = %s
                """,
                (email,),
            )
            row = cur.fetchone()

            if row:
                existing_id, existing_name, existing_phone, has_user_info = row
                is_exact_duplicate = (existing_name or "").strip().lower() == name.strip().lower() and (existing_phone or "").strip() == phone.strip()
                if is_exact_duplicate:
                    if has_user_info:
                        return _json_response(
                            {
                                "error": "This email, name, and phone combination is already registered. Please use a different email or contact support if you need assistance."
                            },
                            409,
                        )
                    else:
                        return _json_response({"error": "Email already registered", "userId": existing_id, "canContinue": True}, 409)
                else:
                    return _json_response(
                        {"error": "This email is already registered with different information. Please use a different email address."},
                        409,
                    )

            user_id = str(uuid.uuid4())
            now = datetime.now(tz=timezone.utc)
            cur.execute(
                """
                INSERT INTO "BasicInfo" ("id", "name", "email", "phone", "createdAt", "updatedAt")
                VALUES (%s, %s, %s, %s, %s, %s)
                """,
                (user_id, name, email, phone, now, now),
            )

        return _json_response({"success": True, "userId": user_id, "message": "Basic information saved successfully"}, 201)
    except Exception as e:
        msg = str(e)
        hint = "Database connection issue. Please check DATABASE_URL environment variable." if re.search(r"connect|database", msg, re.I) else None
        body = {"error": "Internal server error", "details": msg if os.getenv("STAGE", "dev") == "dev" else None}
        if hint:
            body["hint"] = hint
        return _json_response(body, 500)


