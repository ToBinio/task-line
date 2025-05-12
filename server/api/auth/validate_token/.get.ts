import type { JwtValidation } from "#shared/types";
import { H3Error } from "h3";

export default defineEventHandler(async (event): Promise<JwtValidation> => {
  const jwt = Auth.get(event);

  if (jwt instanceof H3Error) {
    throw jwt;
  }

  return {
    success: !!jwt,
  };
});
