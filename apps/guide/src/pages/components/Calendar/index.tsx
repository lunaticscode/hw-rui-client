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
        {/* <Calendar.Today /> */}
        <Calendar.Today>
          {(goToday) => <button onClick={goToday}>CustomToday</button>}
        </Calendar.Today>
        {/* <Calendar.Modes /> */}
        <Calendar.Modes>
          {(modes, handleClickMode) =>
            modes.map((mode, modeIndex) => (
              <button
                onClick={() => handleClickMode(mode)}
                key={`mode-button-${modeIndex}`}
              >
                CustomMode {`[${mode.toUpperCase()}]`}
              </button>
            ))
          }
        </Calendar.Modes>
        {/* <Calendar.Navigator /> */}
        <Calendar.Navigator>
          {(prev, next) => (
            <div>
              <button onClick={prev}>CustomNav [Prev]</button>
              <button onClick={next}>CustomNav [Next]</button>
            </div>
          )}
        </Calendar.Navigator>
        <Calendar.Body />
      </Calendar>
    </>
  );
};
export default Guide;
