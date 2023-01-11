import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Sidebar } from "./components";
import { Home, Campaigns, CreateCampaign, Profile } from "./pages";
const App = () => {
  return (
    <div className="min-w-full min-h-screen bg-slate-900 text-zinc-100 flex flex-nowrap">
      <div className="hidden md:flex mr-10 relative ml-auto">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
