import { v4 } from "uuid";
import type { Todo, UUID } from "~~/shared/types";

export default defineEventHandler((): Todo[] => {
  return getTestTodos(10);
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

  const data = [];

  for (let i = 0; i < n; i++) {
    const start = Math.floor(Math.random() * 10);
    const duration = Math.floor(Math.random() * 10);

    //random tags
    const tags: UUID[] = [];
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
