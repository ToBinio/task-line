import { defineStore } from "pinia";
import { v4 } from "uuid";
import type { Todo, TodoData, UUID } from "~~/shared/types";

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

      this.data = data;
    },

    async removeTodo(uuid: UUID) {
      this.data = this.data.filter((todo) => todo.uuid !== uuid);

      await $fetch("/api/todos/" + uuid, {
        method: "DELETE",
      }).catch(async (err) => {
        //todo - show in toast
        console.warn(err);
        await this.fetch();
      });
    },

    async addTodo(todoData: TodoData) {
      const uuid = v4();

      const todo = {
        uuid,
        ...todoData,
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

    async updateTodo(uuid: UUID, todoData: TodoData) {
      const todo = {
        uuid,
        ...todoData,
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
