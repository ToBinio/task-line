import jwt from "jsonwebtoken";
import type { JwtToken } from "#shared/types";

export default defineEventHandler(async (event): Promise<JwtToken> => {
  const token = Auth.getOrThrow(event);

  const runtimeConfig = useRuntimeConfig();
  const newToken = jwt.sign(
    { sub: token.sub, email: token.email, picture: token.picture },
    runtimeConfig.jwtSecret,
    {
      expiresIn: (runtimeConfig.public.jwtTTL + "s") as `${number}s`,
    },
  );

  return { token: newToken };
});
