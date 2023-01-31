import React, { useState, useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
// import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0x6170878c9d3e71FdD183d750E549D5BC67816900"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();
  const [isActive, setIsActive] = useState('dashboard')
  async function publishCampaign({
    title,
    description,
    target,
    deadline,
    image,
  }) {
    try {
      const data = await createCampaign([
        address,
        title,
        description,
        target,
        new Date(deadline).getTime(),
        image,
      ]);
      console.log("contract call success! ");
      console.log(data);
    } catch (error) {
      console.error("error while contract call : " + error);
    }
  }

  async function getCampaigns() {
    try {
      const campaigns = await contract.call("getCampaigns");
      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        pId: i,
      }));
      return parsedCampaigns;
    } catch (error) {
      console.log("error while getting campaigns : " + error);
    }
  }
  async function getUserCampaigns() {
    try {
      const allCampaigns = await getCampaigns();
      return allCampaigns.filter((campaign) => campaign.owner === address);
    } catch (error) {
      console.log("error while getting campaigns : " + error);
    }
  }
  async function getDonations(pId) {
    try {
      const donations = await contract.call("getDonators", pId);
      const donationsNbr = donations[0].length;
      const parsedDonations = [];
  
      for (let i = 0; i < donationsNbr; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString())
        });
      }
  
      return parsedDonations;
    } catch (error) {
      console.error("error: " + error )
    }
  }
  async function donate(pId, amount) {
    try {
      const data = await contract.call("donateToCampaign", pId, {
        value: ethers.utils.parseEther(amount),
      });
      return data;
    } catch (error) {
      console.error("error: " + error )
    }
  }
  return (
    <StateContext.Provider
      value={{
        isActive,
        setIsActive,
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        getDonations,
        donate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
