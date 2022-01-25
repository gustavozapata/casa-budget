import React from "react";
import { useDispatch } from "react-redux";
import { handleNewExpenseForm } from "../../store/appSlice";

const TextField = ({ name, value }) => {
  const dispatch = useDispatch();

  return (
    <div className="TextField">
      <label htmlFor={name}>
        {name}
        <br />
        <input
          type="text"
          name={name.toLowerCase()}
          value={value}
          onChange={(e) =>
            dispatch(
              handleNewExpenseForm({
                element: e.target.name.toLowerCase(),
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
