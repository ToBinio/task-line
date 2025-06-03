import type { H3Error } from "h3";
import type { Label, UUID } from "~~/shared/types";
import { Labels } from "./labels";

function getKey(userId: string): string {
  return `categories:${userId}`;
}

export const Categories = {
  async getAll(userId: string): Promise<Label[]> {
    return Labels.getAll(userId, getKey);
  },
  async updateOrAdd(userId: string, tag: Label): Promise<Label | H3Error> {
    return Labels.updateOrAdd(userId, tag, getKey);
  },
  async delete(userId: string, uuid: UUID): Promise<Label | H3Error> {
    return Labels.delete(userId, uuid, getKey);
  },
};
