import { defineStore } from "pinia";
import { v4 } from "uuid";
import type { Todo, UUID } from "~~/shared/types";

export const useTodoStore = defineStore("todos", {
  state: (): { data: Todo[] } => ({
    data: [],
  }),
  actions: {
    async fetch() {
      const data = await $fetch("/api/todos").catch(async (err) => {
        //todo - show in toast
        console.warn(err);
        return [];
      });

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

      await $fetch("/api/todos/" + uuid, {
        method: "DELETE",
      }).catch(async (err) => {
        //todo - show in toast
        console.warn(err);
        await this.fetch();
      });
    },

    async addTodo(todoData: EditTodoData) {
      const uuid = v4();

      if (!todoData.to) {
        todoData.to = todoData.from;
      }

      const todo = {
        uuid,
        title: todoData.title,
        start: todoData.from,
        end: addDays(todoData.to!, 1),
        tags: todoData.tags,
      };

      this.data.push(todo);

      await $fetch("/api/todos", {
        method: "POST",
        body: todo,
      }).catch(async (err) => {
        //todo - show in toast
        console.warn(err);
        await this.fetch();
      });
    },

    async updateTodo(uuid: UUID, todoData: EditTodoData) {
      const todo = {
        uuid,
        title: todoData.title,
        start: todoData.from,
        end: addDays(todoData.to!, 1),
        tags: todoData.tags,
      };

      const index = this.data.findIndex((value) => value.uuid === uuid);
      this.data[index] = todo;

      await $fetch("/api/todos", {
        method: "POST",
        body: todo,
      }).catch(async (err) => {
        //todo - show in toast
        console.warn(err);
        await this.fetch();
      });
    },
  },
  getters: {
    getTodoById(state) {
      return (uuid: UUID) => state.data.find((todo) => todo.uuid === uuid);
    },
  },
});
