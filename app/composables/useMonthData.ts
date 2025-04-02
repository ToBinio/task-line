export type DayData = { id: number; date: Date; thisMonth: boolean };

export function useMonthData(year: Ref<number>, monthIndex: Ref<number>) {
  return computed(() => {
    let current = new Date(year.value, monthIndex.value);

    let monthData: DayData[][] = [];

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
            current.getMonth() == monthIndex.value &&
            current.getFullYear() == year.value,
        });

        current = addDays(current, 1);
      }

      monthData.push(currentWeek);
    }

    return monthData;
  });
}
