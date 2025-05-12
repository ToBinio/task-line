import type { EventStream } from "h3";

export const TodoEventStream = {
  addStream(eventStream: EventStream) {
    addEventStream(todosEventStreams, eventStream);
  },
  async sendUpdate() {
    await publish(todosEventStreams, await Todos.getAll());
  },
};

export const TagEventStream = {
  addStream(eventStream: EventStream) {
    addEventStream(tagsEventStreams, eventStream);
  },
  async sendUpdate() {
    await publish(tagsEventStreams, await Tags.getAll());
  },
};

const todosEventStreams: EventStream[] = [];
const tagsEventStreams: EventStream[] = [];

function addEventStream(eventStreams: EventStream[], eventStream: EventStream) {
  eventStreams.push(eventStream);

  eventStream.onClosed(async () => {
    eventStreams.splice(eventStreams.indexOf(eventStream), 1);
    await eventStream.close();
  });
}

async function publish(eventStreams: EventStream[], data: object) {
  const json = JSON.stringify(data);

  eventStreams.forEach((eventStream) => {
    eventStream.push(json);
  });
}
