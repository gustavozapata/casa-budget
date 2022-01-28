import React from "react";
import { selectSuggestion } from "../../store/appSlice";
import { useSelector, useDispatch } from "react-redux";
import "./SearchSuggestions.css";

const SearchSuggestions = ({ name, value, isSearch }) => {
  const suggestions = useSelector((state) => state.app.suggestions);
  const textFieldFocus = useSelector((state) => state.app.textFieldFocus);
  const dispatch = useDispatch();

  return (
    <div className="SearchSuggestions">
      <div
        className={`suggestions-container ${
          suggestions.length > 0 &&
          value !== "" &&
          isSearch &&
          textFieldFocus === name
            ? "show-suggestions"
            : ""
        }`}
      >
        {suggestions.map((item) => (
          <p
            key={item}
            className="suggestion"
            onClick={() => dispatch(selectSuggestion({ name, value: item }))}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchSuggestions;
