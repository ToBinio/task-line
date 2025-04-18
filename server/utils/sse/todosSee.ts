import type { EventStream } from "h3";

const eventStreams: EventStream[] = [];

export function addTodoEventStream(eventStream: EventStream) {
  eventStreams.push(eventStream);

  eventStream.onClosed(async () => {
    eventStreams.splice(eventStreams.indexOf(eventStream), 1);
    await eventStream.close();
  });
}

export async function sendTodoUpdate() {
  const todos = await getTodos();

  eventStreams.forEach((eventStream) => {
    eventStream.push(JSON.stringify(todos));
  });
}
