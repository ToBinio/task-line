export default defineAuthenticatedEventHandler(async (event, token) => {
  const eventStream = createEventStream(event);
  TagEventStream.addStream(token.sub, eventStream);

  return eventStream.send();
});
