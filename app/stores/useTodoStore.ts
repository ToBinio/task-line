import { defineStore } from "pinia";
import { v4 } from "uuid";
import type { Todo, UUID } from "~~/shared/types";

export const useTodoStore = defineStore("todos", {
  state: (): { data: Todo[] } => ({
    data: [],
  }),
  actions: {
    async fetch() {
      const data = await $fetch("/api/todos");

      const transformedData = data.map((todo) => ({
        ...todo,
        start: new Date(todo.start),
        end: new Date(todo.end),
      }));

      this.data = transformedData;
    },

    async removeTodo(uuid: UUID) {
      const index = this.data.findIndex((value) => value.uuid === uuid);
      this.data.splice(index, 1);

      await $fetch("/api/todo/" + uuid, {
        method: "DELETE",
      }).catch(async (err) => {
        console.warn(err);
        // TODO: reanable once handeling todos via login
        // await this.fetch();
      });
    },

    addTodo(todo: EditTodoData) {
      const uuid = v4();

      if (!todo.to) {
        todo.to = todo.from;
      }

      this.data.push({
        uuid,
        title: todo.title,
        start: todo.from,
        end: addDays(todo.to!, 1),
        tags: todo.tags,
      });
    },

    updateTodo(uuid: UUID, todo: EditTodoData) {
      const index = this.data.findIndex((value) => value.uuid === uuid);
      this.data[index] = {
        uuid,
        title: todo.title,
        start: todo.from,
        end: addDays(todo.to!, 1),
        tags: todo.tags,
      };
    },
  },
  getters: {
    getTodoById(state) {
      return (uuid: UUID) => state.data.find((todo) => todo.uuid === uuid);
    },
  },
});
