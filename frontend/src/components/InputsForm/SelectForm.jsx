import React from "react";

const SelectForm = ({ children, name, onChange, value, touched, error }) => {
  return (
    <select
      name={name}
      className={`input_contact text-black placeholder:text-slate-400 bg-white rounded-none  mt-1 md:p-2 p-1 border  
    placeholder-slate-600
    focus:outline-none w-full block
    border-gray-500

    ${
      error && touched
        ? "border-1 focus:border-red-500 border-red-500"
        : "focus:border-indigo-500 "
    }`}
      id={name}
      onChange={onChange}
      value={value}
    >
      <option value="">Select Category</option>

      {children}
    </select>
  );
};

export default SelectForm;
