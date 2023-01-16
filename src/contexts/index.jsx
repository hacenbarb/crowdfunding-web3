import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

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
  return (
    <StateContext.Provider
      value={{ address, contract, connect, createCampaign: publishCampaign }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
