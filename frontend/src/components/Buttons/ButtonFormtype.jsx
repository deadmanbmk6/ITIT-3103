import React from "react";

const ButtonFormtype = ({ onClick, text }) => {
  return (
    <button
      className={`uppercase text-xl md:text-2xl border-neutral-300 border-2 px-2 py-1

    ${text === "expense" ? "hover:text-orange-500" : "hover:text-emerald-600"} 

    ${
      text === "expense"
        ? "hover:border-orange-500"
        : "hover:border-emerald-600"
    } 
    
    duration-200`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonFormtype;
