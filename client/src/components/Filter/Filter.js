import React from "react";
import "./Filter.css";

const Filter = ({ handleChange }) => {
  return (
    <div className="Filter">
      <input
        type="text"
        placeholder="Filter expenses"
        onChange={handleChange}
      />
      {/* TODO: add x icon to clear filter */}
    </div>
  );
};

export default Filter;
