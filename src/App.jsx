import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [time, setTime] = useState(50000);
  const [isRunning, setIsRunning] = useState(false);
  const [lapTime, setLapTime] = useState([]);

  const clickReset = () => {
    setTime(0);
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time + 1);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [time, isRunning]);

  function formattedTime(time) {
    const hour = Math.floor(time / 60 / 60 / 100);
    const min = Math.floor((time / 60 / 100) % 60);
    const sec = Math.floor((time / 100) % 60);
    const msec = time % 100;

    return (
      <div>
        {hour.toString().padStart(2, "0")} : {min.toString().padStart(2, "0")} :{" "}
        {sec.toString().padStart(2, "0")} : {msec.toString().padStart(2, "0")}
      </div>
    );
  }

  const handleStartClick = () => {
    setIsRunning(!isRunning);
  };

  const clickLap = () => {
    // setLapTime((prevLapTimes) => [...prevLapTimes, time])
    setLapTime([...lapTime, time]);
    console.log(lapTime);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="text-white mb-40 text-4xl m-20">
        {formattedTime(time)}
      </div>
      <div className="flex justify-center items-center">
        <button
          className={
            isRunning
              ? "bg-red-400 w-24 h-16 mr-24 text-white rounded-xl text-2xl"
              : "bg-green-400 w-24 h-16 mr-24 text-white rounded-xl text-2xl"
          }
          onClick={handleStartClick}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="bg-yellow-400 w-24 h-16 text-white rounded-xl text-2xl"
          onClick={clickLap}
        >
          lap
        </button>
        <button
          onClick={clickReset}
          className="bg-yellow-400 w-24 h-16 text-white rounded-xl text-2xl"
        >
          Reset
        </button>
      </div>
      <div className="text-white">
        {lapTime.map((v, i) => {
          return (
            <div className="flex items-center justify-center">
              <div className="mr-4">{i}번</div> <div>{formattedTime(v)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
