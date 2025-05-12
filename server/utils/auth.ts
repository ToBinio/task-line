import { H3Error, type H3Event } from "h3";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "~~/shared/types";

export const Auth = {
  get(event: H3Event): undefined | JwtPayload | H3Error {
    const token = getCookie(event, "token");

    if (!token) {
      return createError({ statusCode: 400, statusMessage: "No JwtToken set" });
    }

    try {
      const runtimeConfig = useRuntimeConfig();

      return jwt.verify(token, runtimeConfig.jwtSecret) as JwtPayload;
    } catch {
      return undefined;
    }
  },

  getOrError(event: H3Event): JwtPayload | H3Error {
    const token = Auth.get(event);

    if (!token) {
      return createError({
        statusCode: 401,
        statusMessage: "Invalid JwtToken",
      });
    }

    return token;
  },

  getOrThrow(event: H3Event): JwtPayload {
    const token = Auth.getOrError(event);

    if (token instanceof H3Error) {
      throw token;
    }

    return token;
  },
};
