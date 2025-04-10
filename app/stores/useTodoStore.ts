import { defineStore } from "pinia";
import { v4 } from "uuid";
import type { Todo, UUID } from "~~/shared/types";

export const useTodoStore = defineStore("todos", {
  state: (): { data: Todo[] } => ({
    data: getTestTodos(20),
  }),
  actions: {
    removeTodo(uuid: UUID) {
      const index = this.data.findIndex((value) => value.uuid === uuid);
      this.data.splice(index, 1);
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

function getToDayInNDays(days: number): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const date = new Date(now.getTime() + 1000 * 60 * 60 * 24 * days);

  return date;
}

function getTestTodos(n: number): Todo[] {
  const tasks = [
    "Deutsch Hausaufgabe",
    "WMC Aufgabe 1",
    "WMC Aufgabe 2",
    "Minecraft Film im Kino anschauen",
  ];

  const tagsStore = useTagStore();

  const data = [];

  for (let i = 0; i < n; i++) {
    const start = Math.floor(Math.random() * 10);
    const duration = Math.floor(Math.random() * 10);

    //random tags
    const tags: UUID[] = [];
    if (Math.round(Math.random()) == 0) {
      tags.push(
        tagsStore.data[Math.floor(Math.random() * tagsStore.data.length)]!.uuid,
      );
    }

    const uuid = v4();

    data.push({
      uuid,
      title: tasks[i % tasks.length]!,
      start: getToDayInNDays(start),
      end: getToDayInNDays(start + duration),
      tags: tags,
    });
  }

  return data;
}
