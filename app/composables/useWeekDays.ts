export function useWeekDays(start: Date) {
  const { locale } = useI18n();

  const dayStrings = [];

  let now = start;

  for (let i = 0; i < 7; i++) {
    dayStrings.push(
      now.toLocaleString(locale.value, { weekday: "long" }).substring(0, 2),
    );

    // Increment the date by one day
    now = addDays(now, 1);
  }

  return dayStrings;
}
