import React from "react";

const ButtonTransaction = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="font-bold uppercase p-3 md:p-5 bg-slate-900 hover:bg-slate-700 duration-300 text-white rounded-md border-2 shadow-md border-cyan-200"
    >
      {text}
    </button>
  );
};

export default ButtonTransaction;
