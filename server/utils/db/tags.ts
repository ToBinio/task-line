import type { H3Error } from "h3";
import type { Label, UUID } from "~~/shared/types";

function getKey(userId: string): string {
  return `tags:${userId}`;
}

export const Tags = {
  KEY: "tags",
  async getAll(userId: string): Promise<Label[]> {
    const storage = useStorage();
    return (
      (await storage.get<Label[]>(getKey(userId))) ??
      (import.meta.dev ? getTestTags() : [])
    );
  },
  async updateOrAdd(userId: string, tag: Label): Promise<Label | H3Error> {
    const storage = useStorage();
    const tags = await Tags.getAll(userId);

    const index = tags.findIndex((value) => value.uuid === tag.uuid);

    if (index === -1) {
      tags.unshift(tag);
    } else {
      tags[index] = tag;
    }

    await storage.set(getKey(userId), tags);

    return tag;
  },
  async delete(userId: string, uuid: UUID): Promise<Label | H3Error> {
    const storage = useStorage();
    const tags = await Tags.getAll(userId);

    const index = tags.findIndex((value) => value.uuid === uuid);
    if (index == -1)
      return createError({
        status: 404,
        statusMessage: "Not Found",
        message: `Tag with with uuid ${uuid} not found`,
      });

    const todo = tags.splice(index, 1)[0]!;
    await storage.set(getKey(userId), tags);

    return todo;
  },
};
