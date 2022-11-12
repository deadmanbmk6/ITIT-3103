import React from "react";

const AlertAuth = ({ error, text }) => {
  return (
    <div
      className={`text-sm text-white text-center ${
        error ? "bg-amber-600" : "bg-sky-600"
      } uppercase text-center  p-3 rounded-md`}
    >
      <p>{text}</p>
    </div>
  );
};

export default AlertAuth;
