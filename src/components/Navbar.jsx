import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Btn, Loader } from "./";
import { logo, menu, search as searchIcon , thirdweb } from "../assets";
import { navlinks } from "../constants";
import { useStateContext } from "../contexts";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
  const className = `flex justify-center items-center ${
    isActive && isActive === name && "bg-gray-700"
  } ${
    !disabled ? "cursor-pointer hover:bg-gray-700" : "cursor-not-allowed"
  } ${styles}`;
  return (
    <div className={className} onClick={handleClick}>
      <img
        src={imgUrl}
        alt={name}
        className={`w-full h-full p-2 ${isActive !== name && "grayscale"} `}
      />
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const [searchInput, setSearchInput] = useState('')
  function handleConnect() {
    if (address) navigate("create-campaign");
    else {
      setIsLoading(true);
      connect();
      setIsLoading(false);
    }
  }
  function handleChange(e) {
    setSearchInput(e.target.value)
  }
  function search() {
    if(searchInput === '') {

    }
  }
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between container py-4 mb-8 gap-4">
      {isLoading && <Loader />}
      <div className="hidden md:flex-1 md:flex flex-row max-w-md py-2 pl-4 pr-2 h-12 bg-slate-800 rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          value={searchInput}
          onChange={handleChange}
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-gray-400 text-slate-100 bg-transparent outline-none"
        />

        <div className="w-20 h-full rounded-3xl bg-primary flex justify-center items-center cursor-pointer" onClick={search}>
          <img
            src={searchIcon}
            alt="search"
            className="w-4 h-4 object-contain text-white"
          />
        </div>
      </div>
      <div className="hidden md:flex items-center justify-between flex-row gap-4">
        <Btn
          btnType="button"
          title={address ? "Create a campaign" : "Connect"}
          style={address ? "bg-primary" : "bg-secondary-light"}
          handleClick={handleConnect}
        />
        <Link to="/profile">
          <div className="w-12 h-12 rounded-full bg-gray-800 shadow-lg flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="md:hidden flex container justify-between">
        <div
          className="w-8 h-8 bg-slate-900 p-1 cursor-pointer"
          onClick={() => {
            setToggleDrawer((prev) => !prev);
          }}
        >
          <img src={menu} alt="menu" className="w-full h-full object-contain" />
        </div>
        <Link to="/profile">
          <div className="w-9 h-9 p-2 rounded-full bg-gray-800 shadow-lg flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
        {toggleDrawer && (
          <div
            className={` absolute top-[3.5rem] left-4 right-4 bg-slate-800 py-8 px-4 rounded-xl ${
              !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
            } transition-all duration-300`}
          >
            <ul className="mb-4">
              {navlinks.map((link) => (
                <li
                  key={link.name}
                  className={`flex p-4 ${
                    isActive === link.name && "bg-[#3a3a43]"
                  }`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${
                      isActive === link.name ? "grayscale-0" : "grayscale"
                    }`}
                  />
                  <p
                    className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                      isActive === link.name
                        ? "text-primary"
                        : "text-[#808191]"
                    }`}
                  >
                    {link.name}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex mx-4">
              <Btn
                title={address ? "Create a campaign" : "Connect"}
                styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
                handleClick={() => {
                  if (address) navigate("create-campaign");
                  else connect();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
