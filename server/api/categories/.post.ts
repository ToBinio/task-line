import { H3Error } from "h3";
import { LabelSchema, type Label } from "~~/shared/types";

export default defineAuthenticatedEventHandler(
  async (event, token): Promise<Label> => {
    const newCategory = await readValidatedBody<Label>(event, (data) => {
      return LabelSchema.parse(data) as Label;
    });

    const category = await Categories.updateOrAdd(token.sub, newCategory);
    if (category instanceof H3Error) throw category;

    CategorieEventStream.sendUpdate(token.sub);
    return category;
  },
);
