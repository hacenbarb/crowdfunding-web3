import React from "react";

const Btn = ({ btnType, title, style, handleClick }) => {
  return (
    <button
      type={btnType ? btnType : "button"}
      className={`px-2 py-2 text-white font-medium capitalize text-base bg-primary rounded-xl ${style}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Btn;
