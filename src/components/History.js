import React from "react";
import { useSelector } from "react-redux";

const History = () => {
  const history = useSelector((state) => state.history);

  return (
    <div id="history" className="history-container">
      <h3 className="history-title">Event History</h3>
      <div className="history-box">
        <table className="history-table">
          <thead>
            <tr>
              <th className="history-header">Time</th>
              <th className="history-header">Description</th>
            </tr>
          </thead>
          <tbody>
            {history.map((event, index) => {
              const [time, description] = event.split("    : ");
              return (
                <tr key={index} className="history-row">
                  <td className="history-time">{time}</td>
                  <td className="history-description">{description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;