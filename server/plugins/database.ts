import { TAGS_KEY } from "../utils/db/tags";
import { TODOS_KEY } from "../utils/db/todos";
import { getTestTags, getTestTodos } from "../utils/testData";

export default defineNitroPlugin(async () => {
  const storage = useStorage();

  storage.set(TODOS_KEY, getTestTodos(10));
  storage.set(TAGS_KEY, getTestTags());
});
