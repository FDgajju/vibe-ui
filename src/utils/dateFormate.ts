import { format, isToday, isTomorrow, isYesterday } from "date-fns";

export const prettyDate = (dt: string) => {
  const date = new Date(dt);
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  if (isYesterday(date)) return "Yesterday";

  return format(date, "dd MMMM yyyy");
};
