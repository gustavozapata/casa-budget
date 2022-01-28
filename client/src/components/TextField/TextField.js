import React from "react";
import { useDispatch } from "react-redux";
import { focusTextField, handleNewExpenseForm } from "../../store/appSlice";
import SearchSuggestions from "../SearchSuggestions.js/SearchSuggestions";
import "./TextField.css";

const TextField = ({ label, name, value, type, center, isSearch }) => {
  const dispatch = useDispatch();

  return (
    <div className={`TextField ${center && "textfield-center"}`}>
      <label htmlFor={name}>
        {label}
        <br />
        <input
          type={type}
          name={name}
          value={value}
          autoComplete="off"
          onFocus={() => dispatch(focusTextField({ name, value, isSearch }))}
          onChange={(e) =>
            dispatch(
              handleNewExpenseForm({
                name,
                value: e.target.value,
                isSearch,
              })
            )
          }
        />
      </label>
      <SearchSuggestions name={name} value={value} isSearch={isSearch} />
    </div>
  );
};

export default TextField;
