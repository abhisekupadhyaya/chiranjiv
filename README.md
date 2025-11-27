# Chiranjiv Frontend (Vite + React) and AWS SAM Backend

## Frontend (Vite + React)
Commands:
- npm run dev
- npm run build
- npm run preview

Environment:
- Set VITE_API_BASE_URL to your deployed API base (e.g. https://xxxx.execute-api.ap-south-1.amazonaws.com/dev)
- For local SAM: VITE_API_BASE_URL=http://127.0.0.1:3000
- All frontend environment variables are read via `src/config/env.ts`. Add any new env vars there and consume them through the exported `config` object.

Required frontend env vars (in `.env` at project root):
- VITE_API_BASE_URL
- VITE_OIDC_AUTHORITY
- VITE_OIDC_CLIENT_ID
- VITE_OIDC_REDIRECT_URI
- VITE_OIDC_LOGOUT_REDIRECT_URI
- VITE_OIDC_SCOPE
- VITE_COGNITO_ADDRESS_ATTR_NAME

Optional frontend env vars:
- VITE_COGNITO_DOMAIN
- VITE_OIDC_CLIENT_SECRET

## Backend (AWS SAM, Python)
Location: lambda/

Prereqs:
- conda activate dev
- AWS CLI configured, Docker running

Install deps and run locally:
- cd lambda
- sam build --use-container
- sam local start-api

Deploy (first time guided):
- sam deploy --guided
  - Provide DatabaseUrl (Neon DATABASE_URL with sslmode=require)
  - Set CorsOrigin (e.g. https://localhost:5173 and your prod domain)

After deploy:
- Copy the output ApiEndpoint to frontend .env as VITE_API_BASE_URL
- Verify POST /waitlist/step1 and /waitlist/step2 via curl/Postman

Notes:
- Postgres schema matches Prisma models "BasicInfo" and "UserInfo"
- Passwords hashed with bcrypt (rounds=10)

