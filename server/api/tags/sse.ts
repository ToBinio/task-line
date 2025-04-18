import { addTagEventStream } from "~~/server/utils/sse";

export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  addTagEventStream(eventStream);

  return eventStream.send();
});
