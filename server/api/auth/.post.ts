import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import type { JwtPayload, JwtToken } from "#shared/types";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000",
);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const code = body.code;

  try {
    const result = await client.getToken(code);

    client.setCredentials(result.tokens);

    const decode = jwt.decode(result.res?.data.id_token) as JwtPayload;

    const email = decode?.email;
    const sub = decode?.sub;
    const picture = decode?.picture;

    const token = jwt.sign(
      { sub, email, picture } as JwtPayload,
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    return { token: token } as JwtToken;
  } catch (err) {
    console.error(err);

    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Unauthorized" }),
    );
  }
});
