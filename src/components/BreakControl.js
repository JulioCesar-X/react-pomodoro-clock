import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementBreak, decrementBreak } from "../redux/actions";

const BreakControl = () => {
  const dispatch = useDispatch();
  const breakLength = useSelector((state) => state.breakLength);

  return (
    <div id="break-control" className="control-panel">
      <h2 id="break-label">Break Length</h2>
      <div className="control-buttons">
        <button
          id="break-decrement"
          className="control-button decrement"
          onClick={() => dispatch(decrementBreak())}
        >
          <i className="fas fa-minus">-</i>
        </button>
        <span id="break-length" className="control-value">
          {breakLength}
        </span>
        <button
          id="break-increment"
          className="control-button increment"
          onClick={() => dispatch(incrementBreak())}
        >
          <i className="fas fa-plus">+</i>
        </button>
      </div>
    </div>
  );
};

export default BreakControl;