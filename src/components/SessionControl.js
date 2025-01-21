import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementSession, decrementSession } from "../redux/actions";

const SessionControl = () => {
  const dispatch = useDispatch();
  const sessionLength = useSelector((state) => state.sessionLength);

  return (
    <div id="session-control" className="control-panel">
      <h2 id="session-label">Session Length</h2>
      <div className="control-buttons">
        <button
          id="session-decrement"
          className="control-button decrement"
          onClick={() => dispatch(decrementSession())}
        >
          <i className="fas fa-minus">-</i>
        </button>
        <span id="session-length" className="control-value">
          {sessionLength}
        </span>
        <button
          id="session-increment"
          className="control-button increment"
          onClick={() => dispatch(incrementSession())}
        >
          <i className="fas fa-plus">+</i>
        </button>
      </div>
    </div>
  );
};

export default SessionControl;