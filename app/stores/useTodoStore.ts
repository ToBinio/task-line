import { defineStore } from "pinia";
import { v4 } from "uuid";
import type { Todo, TodoData, UUID } from "~~/shared/types";

export const useTodoStore = defineStore("todos", {
  state: (): { data: Todo[]; sse: EventSource | undefined } => ({
    data: [],
    sse: undefined,
  }),
  actions: {
    async fetch() {
      const fetch = useRequestFetch();
      const data = await fetch("/api/todos", { ...useFetchOptions() }).catch(
        async (err) => {
          //todo - show in toast
          console.warn(err);
          return [];
        },
      );

      this.data = data;
    },
    reset() {
      this.data = [];
      this.stopSSE();
    },

    async initSSE() {
      this.stopSSE();
      this.sse = new EventSource("/api/todos/sse");

      this.sse.onmessage = (event) => {
        const todos = JSON.parse(event.data);
        this.data = todos;
      };
    },
    stopSSE() {
      if (!this.sse) return;
      this.sse.close();
    },

    async removeTodo(uuid: UUID) {
      this.data = this.data.filter((todo) => todo.uuid !== uuid);

      const fetch = useRequestFetch();
      await fetch("/api/todos/" + uuid, {
        method: "DELETE",
        ...useFetchOptions(),
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

      const fetch = useRequestFetch();
      await fetch("/api/todos", {
        method: "POST",
        body: todo,
        ...useFetchOptions(),
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

      const fetch = useRequestFetch();
      await fetch("/api/todos", {
        method: "POST",
        body: todo,
        ...useFetchOptions(),
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

      const fetch = useRequestFetch();
      await fetch("/api/todos/move", {
        method: "POST",
        body: {
          toMove,
          to,
        },
        ...useFetchOptions(),
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
