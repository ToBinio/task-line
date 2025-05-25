import { CalendarDate } from "@internationalized/date";
import { v4 } from "uuid";
import type { Tag, Todo, UUID } from "~~/shared/types";

function getToDayInNDays(days: number): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const date = new Date(now.getTime() + 1000 * 60 * 60 * 24 * days);

  return date;
}

export function getTestTodos(n: number): Todo[] {
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
      note: "",
      timeframe: {
        start: toCalanderDate(getToDayInNDays(start)).toString(),
        end: toCalanderDate(getToDayInNDays(start + duration)).toString(),
      },
      tags: tags,
    });
  }

  return data;
}

function toCalanderDate(date: Date) {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
}

export function getTestTags(): Tag[] {
  return [
    {
      uuid: crypto.randomUUID(),
      name: "School",
      color: "#ff0000",
    },
    {
      uuid: crypto.randomUUID(),
      name: "Work",
      color: "#ff00ff",
    },
  ];
}
