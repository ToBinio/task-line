import type { EventStream } from "h3";

export const TodoEventStream = {
  addStream(userId: string, eventStream: EventStream) {
    addEventStream(userId, todosEventStreams, eventStream);
  },
  async sendUpdate(userId: string) {
    await publish(userId, todosEventStreams, await Todos.getAll(userId));
  },
};

export const TagEventStream = {
  addStream(userId: string, eventStream: EventStream) {
    addEventStream(userId, tagsEventStreams, eventStream);
  },
  async sendUpdate(userId: string) {
    await publish(userId, tagsEventStreams, await Tags.getAll(userId));
  },
};

export const CategorieEventStream = {
  addStream(userId: string, eventStream: EventStream) {
    addEventStream(userId, categoriesEventStreams, eventStream);
  },
  async sendUpdate(userId: string) {
    await publish(userId, categoriesEventStreams, await Tags.getAll(userId));
  },
};

const todosEventStreams: Map<string, EventStream[]> = new Map();
const tagsEventStreams: Map<string, EventStream[]> = new Map();
const categoriesEventStreams: Map<string, EventStream[]> = new Map();

function addEventStream(
  key: string,
  eventStreams: Map<string, EventStream[]>,
  eventStream: EventStream,
) {
  if (!eventStreams.has(key)) {
    eventStreams.set(key, []);
  }
  const eventStreamList = eventStreams.get(key)!;

  eventStreamList.push(eventStream);

  eventStream.onClosed(async () => {
    eventStreamList.splice(eventStreamList.indexOf(eventStream), 1);
    await eventStream.close();
  });
}

async function publish(
  key: string,
  eventStreams: Map<string, EventStream[]>,
  data: object,
) {
  const json = JSON.stringify(data);

  const eventStreamList = eventStreams.get(key) ?? [];

  eventStreamList.forEach((eventStream) => {
    eventStream.push(json);
  });
}
