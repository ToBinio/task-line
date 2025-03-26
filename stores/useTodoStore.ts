import { defineStore } from "pinia";
import type { Todo } from "~/utils/todo";

export const useTodoStore = defineStore("todos", {
  state: (): { data: Todo[] } => ({
    data: [
      {
        title: "Deutsch Hausaufgabe",
        start: getDateInNDays(0),
        end: getDateInNDays(1),
      },
      {
        title: "WMC Aufgabe 1",
        start: getDateInNDays(1),
        end: getDateInNDays(5),
      },
      {
        title: "WMC Aufgabe 2",
        start: getDateInNDays(5),
        end: getDateInNDays(7),
      },
      {
        title: "Minecraft Film im Kino anschauen",
        start: getDateInNDays(3),
        end: getDateInNDays(4),
      },
    ],
  }),
  actions: {
    removeTodo(title: string) {
      const index = this.data.findIndex((value) => value.title === title);
      this.data.splice(index, 1);
    },

    addTodo(title: string, start: Date, end: Date) {
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      this.data.push({ title, start, end });
    },
  },
});

function getDateInNDays(days: number): Date {
  var now = new Date();
  now.setHours(0, 0, 0, 0);
  let date = new Date(now.getTime() + 1000 * 60 * 60 * 24 * days);

  return date;
}
