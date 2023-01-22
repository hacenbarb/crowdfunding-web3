import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);
  return (
    <div
      className="bg-slate-800 rounded-xl cursor-pointer shadow-2xl"
      onClick={handleClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full max-h-36 object-cover rounded-xl shadow-md"
      />
      <div className="flex flex-col p-4">
        <div className="flex items-center mt-2 justify-start">
          <img src={tagType} alt="tag" className="w-4 h-4 object-contain" />
          <p className="ml-2 font-medium text-sm text-gray-500">Category</p>
        </div>
        <div className="mt-4">
          <h3 className="text-slate-50 font-semibold text-xl text-left capitalize truncate">
            {title}
          </h3>
          <p className="mt-1 text-sm text-slate-300 text-left truncate">
            {description} 
          </p>
        </div>
        <div className="flex flex-wrap gap-2 justify-between items-center mt-4">
          <div className="flex flex-col">
            <h4 className="font-semibold text-base text-slate-300 text-center leading-3">
              {amountCollected}
            </h4>
            <p className="mt-1 text-base text-slate-400 sm:max-w-28 text-center">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-base text-slate-300 text-center leading-3">
              {remainingDays < 0 ? "/" : remainingDays}
            </h4>
            <p className="mt-1 text-base text-slate-400 text-center sm:max-w-28 ">
              Days left
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 gap-3">
          <div className="w-6 h-6 rounded-full shadow-sm">
            <img
              src={thirdweb}
              alt="icon"
              className="w-full h-full object-contain object-center"
            />
          </div>
          <p className="flex-1 text-slate-400 truncate" >by<span  className="text-slate-300 text-xs cursor-text"> {owner}</span></p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
