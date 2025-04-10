export type UUID = string;

export type TodoData = {
  title: string;
  start: Date;
  end: Date;
  tags: UUID[];
};

export type Todo = TodoData & {
  uuid: UUID;
};

export type Tag = {
  uuid: UUID;
  name: string;
  color: string;
};
