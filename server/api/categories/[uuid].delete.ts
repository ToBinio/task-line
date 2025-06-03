import { H3Error } from "h3";
import type { Label, UUID } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
  async (event, token): Promise<Label> => {
    const uuid: UUID | undefined = getRouterParam(event, "uuid");

    if (!uuid)
      throw createError({
        status: 400,
        statusMessage: "Bad Request",
        message: `no uuid set - uuid:'${uuid}'`,
      });

    const category = await Categories.delete(token.sub, uuid);
    if (category instanceof H3Error) throw category;

    CategorieEventStream.sendUpdate(token.sub);
    return category;
  },
);
