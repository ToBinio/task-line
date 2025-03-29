export type DayData = { id: number; date: Date; thisMonth: boolean };

export function useMonthData(year: number, month: number) {
  let monthIndex = month - 1;

  let monthData = ref<DayData[][]>([]);

  let current = new Date(year, monthIndex);

  while (current.getDay() != 0) {
    current = addDays(current, -1);
  }

  for (let i = 0; i < 6; i++) {
    let currentWeek: DayData[] = [];

    for (let j = 0; j < 7; j++) {
      currentWeek.push({
        id: current.getDate(),
        date: current,
        thisMonth:
          current.getMonth() == monthIndex && current.getFullYear() == year,
      });

      current = addDays(current, 1);
    }

    monthData.value.push(currentWeek);
  }

  return monthData;
}
