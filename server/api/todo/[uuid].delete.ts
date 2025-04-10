import type { UUID } from "~~/shared/types";

export default defineEventHandler((event) => {
  const uuid: UUID | undefined = getRouterParam(event, "uuid");

  throw createError({
    status: 400,
    statusMessage: "Bad Request",
    message: `failed to delete todo '${uuid}'`,
  });
});
