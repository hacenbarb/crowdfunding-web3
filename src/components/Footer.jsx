import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-800 text-slate-200 p-4 text-center text-sm lg:text-md break-words leading-7">
      <p>
        this project is only for learning purposes | all rights reserved &copy;
      </p>
      <p>
        created with ❤ by{" "}
        <a href="https://github.com/hacenbarb" className="text-blue-400">
          hacen barboucha
        </a>
      </p>
    </div>
  );
};

export default Footer;
