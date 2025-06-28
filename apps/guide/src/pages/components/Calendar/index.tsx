import Intro from "./intro";
import Calendar from "@repo/ui/Calendar";
const Guide = () => {
  return (
    <>
      <Intro />
      <Calendar>
        {/* <Calendar.Current /> */}
        <Calendar.Current>
          {(currentDate) => <h3>{currentDate.toISOString()}</h3>}
        </Calendar.Current>
        <Calendar.Body />
      </Calendar>
    </>
  );
};
export default Guide;
