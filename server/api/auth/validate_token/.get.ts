import { getRequestHeaders } from "h3";
import jwt from "jsonwebtoken";
import type { JwtValidation } from "#shared/types";

export default defineEventHandler(async (event): Promise<JwtValidation> => {
  const headers = getRequestHeaders(event);
  const authHeader = headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Missing Token" });
  }

  try {
    const runtimeConfig = useRuntimeConfig();
    jwt.verify(token, runtimeConfig.jwtSecret);

    return {
      success: true,
    };
  } catch (err) {
    console.log(err);

    return {
      success: false,
    };
  }
});
