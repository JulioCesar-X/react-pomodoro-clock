const initialState = {
  breakLength: 5,        // Duração do intervalo em minutos
  sessionLength: 25,     // Duração da sessão em minutos
  timeLeft: 1500,        // Tempo restante em segundos (25 minutos por padrão)
  isRunning: false,      // Indica se o cronômetro está em execução
  mode: "session",       // 'session' ou 'break'
  history: [],           // Histórico de eventos
};

// Função auxiliar para registrar eventos no histórico
const addEventToHistory = (history, description) => {
  const timestamp = new Date().toLocaleTimeString(); // Horário atual
  return [
    ...history,
    `_/_/_  ${timestamp}    : ${description}`, // Formatação do evento
  ];
};

// Função auxiliar para calcular tempo restante
const calculateTimeLeft = (mode, breakLength, sessionLength) => {
  return mode === "session" ? sessionLength * 60 : breakLength * 60;
};

// Reducer principal
const rootReducer = (state = initialState, action) => {
  const { breakLength, sessionLength, timeLeft, isRunning, mode, history } = state;

  switch (action.type) {
    case "INCREMENT_BREAK": {
      const newBreakLength = Math.min(breakLength + 1, 60);
      return {
        ...state,
        breakLength: newBreakLength,
        history: addEventToHistory(history, "Aumentou a duração do intervalo"),
      };
    }

    case "DECREMENT_BREAK": {
      const newBreakLength = Math.max(breakLength - 1, 1);
      return {
        ...state,
        breakLength: newBreakLength,
        history: addEventToHistory(history, "Diminuiu a duração do intervalo"),
      };
    }

    case "INCREMENT_SESSION": {
      const newSessionLength = Math.min(sessionLength + 1, 60);
      return {
        ...state,
        sessionLength: newSessionLength,
        timeLeft: newSessionLength * 60,
        history: addEventToHistory(history, "Aumentou a duração da sessão"),
      };
    }

    case "DECREMENT_SESSION": {
      const newSessionLength = Math.max(sessionLength - 1, 1);
      return {
        ...state,
        sessionLength: newSessionLength,
        timeLeft: newSessionLength * 60,
        history: addEventToHistory(history, "Diminuiu a duração da sessão"),
      };
    }

    case "TOGGLE_TIMER":
      return {
        ...state,
        isRunning: !isRunning,
        history: addEventToHistory(
          history,
          isRunning ? "Pausou o cronômetro" : "Iniciou o cronômetro"
        ),
      };

    case "RESET":
      return {
        ...initialState,
        history: addEventToHistory(history, "Cronômetro redefinido"),
      };

    case "SWITCH_MODE": {
      const newMode = mode === "session" ? "break" : "session";
      return {
        ...state,
        mode: newMode,
        timeLeft: calculateTimeLeft(newMode, breakLength, sessionLength),
        history: addEventToHistory(
          history,
          newMode === "session" ? "Iniciando sessão" : "Iniciando intervalo"
        ),
      };
    }

    case "TICK": {
      const isEndOfCycle = timeLeft === 1;
      return {
        ...state,
        timeLeft: timeLeft - 1,
        history: isEndOfCycle
          ? addEventToHistory(
              history,
              mode === "session" ? "Sessão finalizada" : "Intervalo finalizado"
            )
          : history,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;