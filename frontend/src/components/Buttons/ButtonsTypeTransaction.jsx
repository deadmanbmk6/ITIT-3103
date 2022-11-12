import React from "react";

const ButtonsTypeTransaction = ({ type, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`text-center font-bold text-lg md:text-2xl uppercase border-2 focus:border focus:border-gray-600 duration-100 p-1 px-3

    border-b-4 active:border-b-4 ${
      type === true ? "border-red-500" : "border-cyan-500"
    } `}
      >
        {` ${type === true ? "Expense 💸" : "Income 💵"}`}
      </button>
    </>
  );
};

export default ButtonsTypeTransaction;
