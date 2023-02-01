import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { money } from "../assets";
import { Btn, FormField, Loader } from "../components";
import { useStateContext } from "../contexts";
import { ethers } from "ethers";
import { checkIfImage } from "../utils";
const initialForm = {
  name: "",
  title: "",
  description: "",
  target: "",
  deadline: "",
  image: "",
};
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const { createCampaign } = useStateContext();

  function handleFormFieldChange(fieldName, e) {
    setForm({ ...form, [fieldName]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        try {
          await createCampaign({
            ...form,
            target: ethers.utils.parseUnits(form.target, 18),
          });
          setIsLoading(false);
          navigate("/");
        } catch (error) {
          console.error("error: " + error);
        }
      } else {
        alert("image doesn't exists: please provide a valid image URL");
        setForm((prev) => ({ ...prev, image: "" }));
      }
    });
  }
  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center items-center">
            <h1 className="font-epilogue font-bold text-2xl md:text-3xl text-white">
              Start a Campaign
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-[65px] flex flex-col gap-[30px]"
          >
            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Your Name *"
                placeholder="John Doe"
                inputType="text"
                value={form.name}
                handleChange={(e) => handleFormFieldChange("name", e)}
              />
              <FormField
                labelName="Campaign Title *"
                placeholder="Write a title"
                inputType="text"
                value={form.title}
                handleChange={(e) => handleFormFieldChange("title", e)}
              />
            </div>

            <FormField
              labelName="Story *"
              placeholder="Write your story"
              isTextArea = {true}
              value={form.description}
              handleChange={(e) => handleFormFieldChange("description", e)}
            />

            <div className="w-full flex justify-center items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px] gap-x-6">
              <img
                src={money}
                alt="money"
                className="w-[40px] h-[40px] object-contain"
              />
              <h4 className="font-epilogue font-bold text-[25px] text-white">
                You will get 100% of the raised amount
              </h4>
            </div>

            <div className="flex flex-wrap gap-[40px]">
              <FormField
                labelName="Goal *"
                placeholder="ETH 0.50"
                inputType="text"
                value={form.target}
                handleChange={(e) => handleFormFieldChange("target", e)}
              />
              <FormField
                labelName="End Date *"
                placeholder="End Date"
                inputType="date"
                value={form.deadline}
                handleChange={(e) => handleFormFieldChange("deadline", e)}
              />
            </div>

            <FormField
              labelName="Campaign image *"
              placeholder="Place image URL of your campaign"
              inputType="url"
              value={form.image}
              handleChange={(e) => handleFormFieldChange("image", e)}
            />
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="text-xl text-yellow-500">
                <CgDanger />
              </span>
              <p>
                fields with <span className="text-bold">'*'</span> are{" "}
                <span className="font-bold">required</span>
              </p>
            </div>
            <div className="flex justify-center items-center mt-4">
              <Btn
                btnType="submit"
                title="Submit new campaign"
                style="px-4"
                onSubmit="handleSubmit"
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateCampaign;
