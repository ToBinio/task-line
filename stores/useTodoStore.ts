import { defineStore } from "pinia";
import type { Todo, UUID } from "~/utils/todo";

export const useTodoStore = defineStore("todos", {
  state: (): { data: Todo[] } => ({
    data: getTestTodos(5),
  }),
  actions: {
    removeTodo(uuid: UUID) {
      const index = this.data.findIndex((value) => value.uuid === uuid);
      this.data.splice(index, 1);
    },

    addTodo(title: string, start: Date, end: Date) {
      let uuid = crypto.randomUUID();
      this.data.push({ uuid, title, start, end: addDays(end, 1) });
    },
  },
});

function getToDayInNDays(days: number): Date {
  var now = new Date();
  now.setHours(0, 0, 0, 0);
  let date = new Date(now.getTime() + 1000 * 60 * 60 * 24 * days);

  return date;
}

function getTestTodos(n: number): Todo[] {
  let tasks = [
    "Deutsch Hausaufgabe",
    "WMC Aufgabe 1",
    "WMC Aufgabe 2",
    "Minecraft Film im Kino anschauen",
  ];

  let data = [];

  for (let i = 0; i < n; i++) {
    let start = Math.floor(Math.random() * 10);
    let duration = Math.floor(Math.random() * 10);

    let uuid = crypto.randomUUID();

    data.push({
      uuid,
      title: tasks[i % tasks.length],
      start: getToDayInNDays(start),
      end: getToDayInNDays(start + duration),
    });
  }

  return data;
}
