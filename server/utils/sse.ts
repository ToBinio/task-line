import type { EventStream } from "h3";

const todosEventStreams: EventStream[] = [];
const tagsEventStreams: EventStream[] = [];

export function addTodoEventStream(eventStream: EventStream) {
  addEventStream(todosEventStreams, eventStream);
}

export function addTagEventStream(eventStream: EventStream) {
  addEventStream(tagsEventStreams, eventStream);
}

function addEventStream(eventStreams: EventStream[], eventStream: EventStream) {
  eventStreams.push(eventStream);

  eventStream.onClosed(async () => {
    eventStreams.splice(eventStreams.indexOf(eventStream), 1);
    await eventStream.close();
  });
}

export async function sendTodoUpdate() {
  await publish(todosEventStreams, await getTodos());
}

export async function sendTagsUpdate() {
  await publish(tagsEventStreams, await getTags());
}

async function publish(eventStreams: EventStream[], data: object) {
  const json = JSON.stringify(data);

  eventStreams.forEach((eventStream) => {
    eventStream.push(json);
  });
}
