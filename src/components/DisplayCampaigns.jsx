import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { FundCard } from "../components";
const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  function handleNavigate(campaign) {
    navigate(`/compaign-details/${campaign.title}`, { state: campaign });
  }
  return (
    <>
      <h1>{`${title} (${campaigns.length})`}</h1>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center mt-8">
          <img
            src={loader}
            alt="loading"
            className="object-contain w-[150px] h-[150px]"
          />
        </div>
      ) : (
        <>
          {campaigns.length === 0 ? (
            <p className="text-slate-300 mt-6">😅 There is no campaigns</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 mt-8">
              {campaigns.map((campaign) => (
                <FundCard
                  key={campaign.pId}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DisplayCampaigns;
