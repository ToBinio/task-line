export function useWeekDays(start: Date) {
  let dayStrings = [];

  let now = start;

  for (let i = 0; i < 7; i++) {
    dayStrings.push(
      now.toLocaleString(undefined, { weekday: "long" }).substring(0, 2),
    );

    // Increment the date by one day
    now = addDays(now, 1);
  }

  return dayStrings;
}
