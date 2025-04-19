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

    async initSSE() {
      const eventSource = new EventSource("/api/todos/sse");

      eventSource.onmessage = (event) => {
        const todos = JSON.parse(event.data);
        this.data = todos;
      };
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

    async moveTodo(toMove: UUID, to: UUID) {
      const dropIndex = this.data.findIndex((todo) => todo.uuid == to);
      const dragIndex = this.data.findIndex((todo) => todo.uuid == toMove);

      const draged = this.data.splice(dragIndex, 1)[0]!;
      this.data.splice(dropIndex, 0, draged);

      await $fetch("/api/todos/move", {
        method: "POST",
        body: {
          toMove,
          to,
        },
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
    isTagUsed(state) {
      return (tagUuid: UUID): boolean =>
        state.data.find((todo) => todo.tags.includes(tagUuid)) !== undefined;
    },
  },
});
