export type MonthData = { id: number; date: Date };

export function useMonthData(year: number, month: number) {
  let monthIndex = month - 1;

  let monthData = ref<(MonthData | undefined)[][]>([]);

  let current = new Date(year, monthIndex);

  while (true) {
    let currentWeek: (MonthData | undefined)[] = [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    ];

    while (true) {
      let day = current.getDay();

      currentWeek[day] = {
        id: current.getDate(),
        date: current,
      };

      current = addDays(current, 1);

      if (
        current.getDay() == 0 ||
        current.getMonth() != monthIndex ||
        current.getFullYear() != year
      ) {
        break;
      }
    }

    monthData.value.push(currentWeek);

    if (current.getMonth() != monthIndex || current.getFullYear() != year) {
      break;
    }
  }

  return monthData;
}
