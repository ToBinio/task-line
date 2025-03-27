export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type Todo = { uuid: UUID; title: string; start: Date; end: Date };
