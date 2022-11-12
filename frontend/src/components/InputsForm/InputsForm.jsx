import React from "react";

const InputsForm = ({
  name,
  value,
  error,
  touched,
  onBlur,
  onChange,
  type,
  placeholder,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="capitalize font-semibold">
        {name}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`input_contact text-black placeholder:text-slate-400 bg-white rounded-none  mt-1 md:p-2 p-1 border  
            placeholder-slate-600
            focus:outline-none w-full block
            border-gray-500
    
            ${
              error && touched
                ? "border-1 focus:border-red-500 border-red-500"
                : "focus:border-indigo-500 "
            }`}
      />
    </div>
  );
};

export default InputsForm;
