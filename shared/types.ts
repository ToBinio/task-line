export type UUID = string;

export type Todo = TodoData & {
  uuid: UUID;
};

export type TodoData = {
  title: string;
  timeframe: Timeframe | undefined;
  tags: UUID[];
};

/** iso formatted strings */
export type Timeframe = {
  start: string;
  end: string;
};

export type Tag = {
  uuid: UUID;
  name: string;
  color: string;
};

export type JwtValidation = {
  success: boolean;
};

export type JwtPayload = {
  sub: string;
  email: string;
  picture: string;
}