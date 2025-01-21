import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Beep from "./Beep";
import { toggleTimer, resetTimer, addHistory } from "../redux/actions";

const Timer = () => {
  const { mode, timeLeft, isRunning } = useSelector((state) => state);
  const dispatch = useDispatch();
  const audioRef = useRef(null);

  // Função para tocar o som
  const playBeep = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) =>
        console.warn("Erro ao reproduzir o áudio:", err)
      );
    }
  };

  // Função para parar o som
  const stopBeep = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Controle do cronômetro
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => dispatch({ type: "TICK" }), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      playBeep();
      dispatch(addHistory(`Fim do ${mode}. Iniciando o próximo.`));
      dispatch({ type: "SWITCH_MODE" });
    }
  }, [isRunning, timeLeft, dispatch, mode]);

  // Formatação do tempo em mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const timeFormatted = formatTime(timeLeft);

  return (
    <div id="timer" className="timer-container">
      <h2 id="timer-label" className="timer-label">
        {mode === "session" ? "Session" : "Break"}
      </h2>

      {/* Exibição para o teste (apenas texto) */}
      <div id="time-left" style={{ display: "none" }}>
        {timeFormatted}
      </div>

      {/* Elemento estilizado para exibição */}
      <div className="time-visual">
        {timeFormatted.split("").map((char, index) => (
          <span
            key={index}
            className={`time-char ${char === ":" ? "separator" : ""}`}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="timer-buttons">
        <button
          id="start_stop"
          onClick={() => dispatch(toggleTimer())}
          className={`start ${isRunning ? "paused" : "running"}`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          id="reset"
          onClick={() => {
            stopBeep();
            dispatch(resetTimer());
          }}
          className="reset"
        >
          Reset
        </button>
      </div>
      <Beep ref={audioRef} />
    </div>
  );
};

export default Timer;