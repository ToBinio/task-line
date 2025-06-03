import type { H3Error } from "h3";
import type { Label, UUID } from "~~/shared/types";

export const Labels = {
  async getAll(
    userId: string,
    getKey: (id: string) => string,
  ): Promise<Label[]> {
    const storage = useStorage();
    return (
      (await storage.get<Label[]>(getKey(userId))) ??
      (import.meta.dev ? getTestTags() : [])
    );
  },
  async updateOrAdd(
    userId: string,
    label: Label,
    getKey: (id: string) => string,
  ): Promise<Label | H3Error> {
    const storage = useStorage();
    const labels = await Labels.getAll(userId, getKey);

    const index = labels.findIndex((value) => value.uuid === label.uuid);

    if (index === -1) {
      labels.unshift(label);
    } else {
      labels[index] = label;
    }

    await storage.set(getKey(userId), labels);

    return label;
  },
  async delete(
    userId: string,
    uuid: UUID,
    getKey: (id: string) => string,
  ): Promise<Label | H3Error> {
    const storage = useStorage();
    const labels = await Labels.getAll(userId, getKey);

    const index = labels.findIndex((value) => value.uuid === uuid);
    if (index == -1)
      return createError({
        status: 404,
        statusMessage: "Not Found",
        message: `Tag with with uuid ${uuid} not found`,
      });

    const label = labels.splice(index, 1)[0]!;
    await storage.set(getKey(userId), labels);

    return label;
  },
};
