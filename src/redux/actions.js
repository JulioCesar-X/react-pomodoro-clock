export const incrementBreak = () => ({ type: "INCREMENT_BREAK" });
export const decrementBreak = () => ({ type: "DECREMENT_BREAK" });

export const incrementSession = () => ({ type: "INCREMENT_SESSION" });
export const decrementSession = () => ({ type: "DECREMENT_SESSION" });

export const toggleTimer = () => ({ type: "TOGGLE_TIMER" });
export const resetTimer = () => ({ type: "RESET" });

export const addHistory = (event) => ({
  type: "ADD_HISTORY",
  payload: event,
});