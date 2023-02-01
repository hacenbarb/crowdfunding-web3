import React from "react";
import { useNavigate } from "react-router-dom";
import { FundCard, Loader } from "../components";
const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  function handleNavigate(campaign) {
    navigate(`/compaign-details/${campaign.title}`, { state: campaign });
  }
  return (
    <>
      <h1>{`${title} (${campaigns.length})`}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {campaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6 mt-8 px-4 md:px-0">
              {campaigns.map((campaign) => (
                <FundCard
                  key={campaign.pId}
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              ))}
            </div>
          ) : (
            <p className="text-slate-300 mt-6">😅 There is no campaigns</p>
          )}
        </>
      )}
    </>
  );
};

export default DisplayCampaigns;
