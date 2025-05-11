import { getRequestHeaders } from "h3";
import jwt from "jsonwebtoken";
import type { JwtValidation } from "#shared/types";

export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event);
  const authHeader = headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return sendError(
      event,
      createError({ statusCode: 401, statusMessage: "Token fehlt" }),
    );
  }

  try {
    const runtimeConfig = useRuntimeConfig();
    jwt.verify(token, runtimeConfig.jwtSecret);

    return {
      success: true,
    } as JwtValidation;
  } catch (err) {
    console.log(err);

    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Token ungültig oder abgelaufen",
      }),
    );
  }
});
