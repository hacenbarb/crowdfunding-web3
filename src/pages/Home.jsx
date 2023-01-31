import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts";
import { DisplayCampaigns } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();
  async function fetchCampaigns() {
    const data = await getCampaigns();
    setCampaigns(data);
  }
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);
    if (contract && signal) {
      fetchCampaigns();
    }
    setIsLoading(false);
    return () => {
      controller.abort();
    };
  }, [contract, address]);
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
