export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  TagEventStream.addStream(eventStream);

  return eventStream.send();
});
