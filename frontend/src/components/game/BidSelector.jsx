import React, { useState } from "react";

const BidSelector = ({ disabled, onSubmit }) => {
  const [selectedBid, setSelectedBid] = useState(1);

  const handleSubmit = () => {
    onSubmit(selectedBid);
  };

  return (
    <div className="bid-panel">
      <div className="bid-title">Place your bid</div>
      <div className="bid-actions">
        <select
          className="bid-select"
          disabled={disabled}
          value={selectedBid}
          onChange={(e) => setSelectedBid(Number(e.target.value))}
        >
          {Array.from({ length: 13 }, (_, index) => index + 1).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button className="game-action-button" disabled={disabled} onClick={handleSubmit}>
          Confirm Bid
        </button>
      </div>
    </div>
  );
};

export default BidSelector;
