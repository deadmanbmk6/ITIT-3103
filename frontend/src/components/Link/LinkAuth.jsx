import React from "react";
import { Link } from "react-router-dom";

const LinkAuth = ({ nav, text, text2 }) => {
  return (
    <Link to={nav} className="">
      <p>
        {text}
        <span className="font-bold text-blue-500 hover:text-blue-700 hover:underline cursor-pointer">
          {text2}
        </span>
      </p>
    </Link>
  );
};

export default LinkAuth;
