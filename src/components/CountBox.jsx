import React from "react";

const CountBox = ({ count, title }) => {
  return (
    <div className="flex flex-col items-center h-full text-center bg-slate-800 rounded-md">
      <h4 className="flex-1 font-bold text-white text-2xl w-full p-4 truncate">
        {count}
      </h4>
      <p className="w-full bg-slate-700 text-gray-300 capitalize rounded-b-md p-2 break-avoid-before">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
