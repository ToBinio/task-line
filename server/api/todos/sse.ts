export default defineAuthenticatedEventHandler(async (event, token) => {
  const eventStream = createEventStream(event);
  TodoEventStream.addStream(token.sub, eventStream);

  return eventStream.send();
});
