import { z } from "zod";

export type UUID = string;

/** iso formatted strings */
export type Timeframe = {
  start: string;
  end: string;
};

export const TodoSchema = z.object({
  uuid: z.string().uuid(),
  title: z.string().min(1),
  timeframe: z
    .object({
      start: z.string().date(),
      end: z.string().date(),
    })
    .optional(),
  tags: z.array(z.string().uuid()),
});

export type Todo = TodoData & {
  uuid: UUID;
};

export type TodoData = {
  title: string;
  timeframe: Timeframe | undefined;
  tags: UUID[];
};

export const TagSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().min(1),
  color: z.string().startsWith("#").length(7),
});

export type Tag = {
  uuid: UUID;
  name: string;
  color: string;
};
