import { defineStore } from "pinia";
import type { Todo } from "~/utils/todo";

export const useTodoStore = defineStore("todos", {
  state: (): { data: Todo[] } => ({
    data: [
      {
        title: "Deutsch Hausaufgabe",
        start: new Date(),
        end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      },
      {
        title: "WMC Aufgabe 1",
        start: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
        end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4),
      },
      {
        title: "WMC Aufgabe 2",
        start: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 4),
        end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
      },
      {
        title: "Minecraft Film im Kino anschauen",
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

    addTodo(title: string, start: Date, end: Date) {
      this.data.push({ title, start, end });
    },
  },
});
