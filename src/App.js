import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BreakControl from "./components/BreakControl";
import SessionControl from "./components/SessionControl";
import Timer from "./components/Timer";
import History from "./components/History";
import "./styles/main.scss";

const App = () => {
  const { isRunning } = useSelector((state) => state);

  useEffect(() => {
    document.body.className = isRunning ? "running" : "paused";
  }, [isRunning]);

  return (
    <div className="pomodoro-container">
      <header className="pomodoro-header">Pomodoro Clock</header>
      <div className="controls">
        <BreakControl />
        <SessionControl />
      </div>
      <Timer />
      <History />
    </div>
  );
};

export default App;
