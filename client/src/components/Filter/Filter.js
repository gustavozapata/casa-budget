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
    </div>
  );
};

export default Filter;
