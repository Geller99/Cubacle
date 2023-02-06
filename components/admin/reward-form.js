import axios from "axios";
import React, { useState } from "react";

/**
 * 
 * @dev is missing Image upload component
 * @returns 
 */

const CreateRewardForm = ({  selectedReward, setSelectedReward, setRewards }) => {
  const [reward, setReward] = useState(selectedReward);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const newReward = { ...reward };
    newReward[name] = value;
    setReward(newReward);
  };

  const handleSubmitReward = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/rewards-create",
        data: {
          title: reward && reward.title,
          detail: reward && reward.detail,
          imageStr: "",
          eligibilityCount: reward && reward.eligibilityCount,
        },
      });
      setRewards(null);
      setSelectedReward(null);
      alert("Successfully Created New Reward");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReward = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/rewards-update",
        data: {
          title: selectedReward && selectedReward.title,
          updatedTitle: reward && reward.title,
          detail: reward && reward.detail,
          imageStr: "",
          eligibilityCount: reward && reward.eligibilityCount,
        },
      });
      setRewards(null);
      setSelectedReward(null);
      alert("Successfully Updated Reward");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={
          selectedReward.title ? handleUpdateReward : handleSubmitReward
        }
      >
        <input
          className="Form-Title"
          type={"text"}
          name={"title"}
          placeholder={"Enter Title..."}
          value={reward && reward.title}
          onChange={handleFormChange}
        />
        <input
          className="Form-Details"
          type={"text"}
          name={"detail"}
          placeholder={"Enter Details..."}
          value={reward && reward.detail}
          onChange={handleFormChange}
        />
        {/* <img src="#" alt=""> Upload Icon </img> */}
        {/* <input
          className="Form-Image"
          type={"text"}
          name={"image"}
          placeholder={"Enter Image..."}
          value={reward && reward.image}
          onChange={handleFormChange}
        /> */}
        <input
          className="Form-EligibilityCount"
          type={"number"}
          name={"eligibilityCount"}
          placeholder={"Enter Count..."}
          value={reward && reward.eligibilityCount}
          onChange={handleFormChange}
        />
        <button onClick={() => setSelectedReward(null)}> Close </button>
        
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default CreateRewardForm;
