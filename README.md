# TaskLine

A simple to-do app focused on tasks that can be completed within a specific time span.

## .env example

```dotenv
TAURI_USED=false
BASE_URL="http://localhost:3000"

GOOGLE_CLIENT_ID=<google_client_id>
GOOGLE_CLIENT_SECRET=<google_client_secret>
GOOGLE_REDIRECT_URL=<google_redirect_url>

JWT_SECRET=<jwt_secret>
JWT_TTL_SECONDS=2592000 // 1Month

MONGODB_DB=<db>
MONGODB_CONNECTION=mongodb://<user>:<password>@<domain>:27017/<db>
```
