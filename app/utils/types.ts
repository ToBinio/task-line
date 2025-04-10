import type { UUID } from "~~/shared/types";

export type EditTodoData = {
  title: string;
  from: Date;
  to: Date | undefined;
  tags: UUID[];
};
