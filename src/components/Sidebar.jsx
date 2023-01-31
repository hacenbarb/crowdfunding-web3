import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logo, sun } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../contexts";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
  const className = `flex justify-center items-center ease-in-out duration-300 ${
    isActive && isActive === name && "bg-slate-200 "
  } ${
    !disabled
      ? "cursor-pointer hover:bg-slate-100 hover:grayscale-0"
      : "cursor-not-allowed grayscale"
  } ${styles}`;
  return (
    <div className={className} onClick={handleClick}>
      <img
        src={imgUrl}
        alt={name}
        className={`w-full h-full p-2 ${
          isActive !== name ? "grayscale-50" : ""
        }`}
      />
    </div>
  );
};
const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isActive, setIsActive } = useStateContext();
  useEffect(() => {
    const locationName = location.pathname.split("/")[1];
    if (locationName !== "") setIsActive(locationName);
    return () => setIsActive("dashboard");
  });
  return (
    <div className="flex flex-col justify-between items-center sticky top-5 ml-5 px-3 py-3 h-[95vh]">
      <Link to="/">
        <Icon
          styles="w-12 h-12 rounded-full"
          imgUrl={logo}
          isActive="hi"
          name="hi"
        />
      </Link>
      <div className="flex-1 flex flex-col justify-between items-center bg-slate-800 rounded-3xl w-16 py-4 mt-8">
        <div className="flex flex-col justify-between items-center gap-6">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              styles="rounded-xl"
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <Icon
          styles="bg-secondary color-white shadow-secondary rounded-xl"
          imgUrl={sun}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default Sidebar;
