import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../contexts";
import { Btn, CountBox, FormField, Loader } from "../components";
import { daysLeft, calculateBarPercentage } from "../utils";
import { thirdweb } from "../assets";

const Campaigns = () => {
  const { state } = useLocation();
  const { address, contract, getDonations, donate } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  async function fetchDonators() {
    const data = await getDonations(state.pId);
    setDonators(data);
  }
  function handleFormFieldChange(e) {
    setAmount(e.target.value);
    if (amount < 0) {
      setAmount(0.1);
    }
  }
  async function handleDonate(e) {
    e.preventDefault();
    setIsLoading(true);
    if (amount > 0) {
      await donate(state.pId, amount);
    } else {
      alert("you can't donate 0 ETH, please enter a valid amount");
    }
    setIsLoading(false);
  }
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);
    if (contract && signal) fetchDonators();
    setIsLoading(false);
    return () => {
      controller.abort();
    };
  }, [contract, address]);
  return (
    <>
      <h2>Campaign Details {state.name}</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-3 lg:grid-cols-4 lg:grid-row-3 gap-x-4 gap-y-8 mt-8">
            <div className="col-span-3 row-span-3">
              <img
                src={state.image}
                alt="campaign image"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="w-full h-2 rounded-full bg-slate-800 mt-2 text-transparent shadow-md relative">
                <div
                  className={`absolute h-full bg-green-400 ${
                    state.target === state.amountCollected
                      ? "rounded-full"
                      : "rounded-l-full"
                  }`}
                  style={{
                    width: `${calculateBarPercentage(
                      state.target,
                      state.amountCollected
                    )}%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
            </div>
            {/* Count Boxes */}
            <CountBox
              count={remainingDays < 0 ? "/" : remainingDays}
              title="Days Left"
            />
            <CountBox
              count={state.amountCollected}
              title={`Raised of ${state.target}`}
            />
            <CountBox count={donators.length} title="Total Backers" />
          </div>
          <div className="flex flex-wrap gap-4 mt-12">
            <div className="min-w-[512px]">
              <div className="mb-6">
                <h4 className="text-xl uppercase font-bold mb-3">Creator</h4>
                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap items-center justify-center w-12 h-12 bg-slate-800 rounded-full shadow-md">
                    <img
                      src={thirdweb}
                      alt="icons"
                      className="w-2/3 h-2/3 object-contain object-center"
                    />
                  </div>
                  <div>
                    <p className="text-md text-slate-200 break-all">
                      {state.owner}
                    </p>
                    <p className="text-sm text-slate-200">
                      <span className="text-green-400">10</span> campaigns
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-xl uppercase font-bold mb-3">Story</h4>
                <q className="text-md text-slate-300">{state.description}</q>
              </div>
              <div className="mb-6">
                <h4 className="text-xl uppercase font-bold mb-3">
                  Donators {`(${donators.length})`}
                </h4>
                <div>
                  {donators.length === 0 ? (
                    <p className="text-sm text-slate-200">
                      😅 Ther's no donations yet, You can be the first one!
                    </p>
                  ) : (
                    donators.map((donator, index) => (
                      <div
                        key={`${donator.donator}-${index}`}
                        className="flex justify-between items-center gap-4 w-full"
                      >
                        <p className="text-sm text-slate-300">
                          {index + 1}. {donator.donator}
                        </p>
                        <p className="text-md text-green-500">
                          {donator.donation}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-xl uppercase font-bold mb-3">Fund</h4>
              {/* 
              don't forget to change the condition to  (remainingDays < 0)
              */}
              {remainingDays === 0 || state.target === state.amountCollected ? (
                <div>👏 funding for this campaign has ended </div>
              ) : (
                <div className="w-full bg-slate-800 p-4 rounded-md">
                  <h4 className="text-xl text-center font-semibold text-slate-300">
                    Pledge without reward
                  </h4>
                  <form
                    onSubmit={handleDonate}
                    className="w-full mt-8 flex flex-col gap-y-4"
                  >
                    <FormField
                      placeholder="ETH 0.1"
                      value={amount}
                      inputType="number"
                      handleChange={(e) => handleFormFieldChange(e)}
                    />
                    <div className="bg-slate-900 w-full px-4 py-6 rounded-md shadow-md">
                      <h5 className="text-slate-200 text-md mb-2">
                        Back it because you believe in it.
                      </h5>
                      <p className="text-slate-400 text-sm">
                        Support the project for no reward, just beacuse it
                        speaks to you.
                      </p>
                    </div>
                    <Btn
                      btnType="submit"
                      title="Fund Campaign"
                      style="bg-[#1dc071] px-4"
                      onSubmit="handleDonate"
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Campaigns;
