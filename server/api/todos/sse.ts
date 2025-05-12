export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  TodoEventStream.addStream(eventStream);

  return eventStream.send();
});
