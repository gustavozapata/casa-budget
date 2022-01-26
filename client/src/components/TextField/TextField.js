import React from "react";
import { useDispatch } from "react-redux";
import { handleNewExpenseForm } from "../../store/appSlice";
import "./TextField.css";

const TextField = ({ label, name, value, type, center }) => {
  const dispatch = useDispatch();

  return (
    <div className={`TextField ${center && "textfield-center"}`}>
      <label htmlFor={name}>
        {label}
        <br />
        <input
          type={type}
          step="0.01"
          pattern="[0-9]*"
          name={name}
          value={value}
          onChange={(e) =>
            dispatch(
              handleNewExpenseForm({
                element: e.target.name,
                value: e.target.value,
              })
            )
          }
        />
      </label>
    </div>
  );
};

export default TextField;
