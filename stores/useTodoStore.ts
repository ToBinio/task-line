import { defineStore } from "pinia";
import type { Todo } from "~/utils/todo";

export const useTodoStore = defineStore("todos", {
  state: (): { data: Todo[] } => ({
    data: [
      {
        title: "huff sagen das er cool ist",
        start: new Date(),
        end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      },
      {
        title: "huffen",
        start: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
        end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4),
      },
      {
        title: "duff",
        start: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4),
        end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
      },
      {
        title: "muff",
        start: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
        end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 3),
      },
    ],
  }),
  actions: {
    removeTodo(title: string) {
      const index = this.data.findIndex((value) => value.title === title);
      this.data.splice(index, 1);
    },
  },
});
