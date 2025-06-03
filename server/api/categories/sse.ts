export default defineAuthenticatedEventHandler(async (event, token) => {
  const eventStream = createEventStream(event);
  CategorieEventStream.addStream(token.sub, eventStream);

  return eventStream.send();
});
