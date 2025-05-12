export default defineEventHandler(async (event) => {
  const token = Auth.getOrThrow(event);

  const eventStream = createEventStream(event);
  TagEventStream.addStream(token.sub, eventStream);

  return eventStream.send();
});
