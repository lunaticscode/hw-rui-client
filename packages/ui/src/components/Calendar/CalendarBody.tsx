import useCalendarDates from "./hooks/useCalendarDates";

const CalendarBody = () => {
  const dates = useCalendarDates();
  console.log(dates);
  return <></>;
};
export default CalendarBody;
