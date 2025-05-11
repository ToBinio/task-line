export default defineEventHandler(async (event) => {
  const eventStream = createEventStream(event);

  addTodoEventStream(eventStream);

  return eventStream.send();
});
