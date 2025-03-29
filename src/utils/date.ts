import { TDayInfo } from "@/types";

export const get7DayRange = (): TDayInfo[] => {
    const today = new Date();

    return Array.from({ length: 7 }, (_, i) => {

      const date = new Date();
      date.setDate(today.getDate() + i - 3);
      const isToday = date.toDateString() === today.toDateString();

      return {
        day: date.getDate(),
        fullDate: date.toISOString().split("T")[0],
        dayName: isToday ? 'Today' : date.toLocaleDateString("en-US", { weekday: "short" }),
        monthName: date.toLocaleDateString("en-US", { month: "short" }), 
      };

    });
};