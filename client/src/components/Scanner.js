import React from "react";
import ReactDOM from "react-dom";

const Scanner = () => {
  const scanner = document.getElementById("scanner");
  scanner.style.display = "block";
  ReactDOM.createPortal(
    <div>
      <input
        type="file"
        capture="environment"
        accept="image/*"
        id="icon-button-file"
      />
    </div>,
    scanner
  );
  return null;
};

export default Scanner;
