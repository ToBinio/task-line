import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import type { JwtPayload, JwtToken } from "#shared/types";

const runtimeConfig = useRuntimeConfig();
const oAuthClient = new OAuth2Client(
  runtimeConfig.public.googleClientId,
  runtimeConfig.googleClientSecret,
  runtimeConfig.public.googleRedirectUrl,
);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const code = body.code;

  try {
    const result = await oAuthClient.getToken(code);

    oAuthClient.setCredentials(result.tokens);

    const decode = jwt.decode(result.res?.data.id_token) as JwtPayload;

    const email = decode?.email;
    const sub = decode?.sub;
    const picture = decode?.picture;

    const runtimeConfig = useRuntimeConfig();

    const token = jwt.sign(
      { sub, email, picture } as JwtPayload,
      runtimeConfig.jwtSecret,
      {
        expiresIn: runtimeConfig.jwtTTL as `${number}h`,
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
