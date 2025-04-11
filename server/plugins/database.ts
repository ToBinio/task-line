import { getTestTodos } from "../utils/testData";
import { TODOS_KEY } from "../utils/todos";

export default defineNitroPlugin(async () => {
  const storage = useStorage();

  storage.set(TODOS_KEY, getTestTodos(10));
});
