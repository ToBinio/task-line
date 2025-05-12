export default defineEventHandler(async (event) => {
  const token = Auth.getOrThrow(event);

  const eventStream = createEventStream(event);
  TodoEventStream.addStream(token.sub, eventStream);

  return eventStream.send();
});
