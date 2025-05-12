import type { H3Error } from "h3";
import type { Tag, UUID } from "~~/shared/types";

function getKey(userId: string): string {
  return `${userId}:tags`;
}

export const Tags = {
  KEY: "tags",
  async getAll(userId: string): Promise<Tag[]> {
    const storage = useStorage();
    return (
      (await storage.get<Tag[]>(getKey(userId))) ??
      (import.meta.dev ? getTestTags() : [])
    );
  },
  async updateOrAdd(userId: string, tag: Tag): Promise<Tag | H3Error> {
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
  async delete(userId: string, uuid: UUID): Promise<Tag | H3Error> {
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
