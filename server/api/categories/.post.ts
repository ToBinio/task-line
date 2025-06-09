import { H3Error } from "h3";
import { Label } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
  async (event, token): Promise<Label> => {
    const newCategory = await readValidatedBody<Label>(event, (data) => {
      return Label.parse(data);
    });

    const category = await Categories.updateOrAdd(token.sub, newCategory);
    if (category instanceof H3Error) throw category;

    CategorieEventStream.sendUpdate(token.sub);
    return category;
  },
);
