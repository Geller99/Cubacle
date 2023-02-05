import React from "react";
import axios from "axios";

const RewardItem = ({
  title,
  detail,
  image,
  eligibilityCount,
  setSelectedReward,
  reward,
}) => {
  const handleDeleteReward = async () => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/rewards-delete",
        data: {
          title: reward.title,
        },
      });
      alert("Successfully Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", color: "red" }}>
      <p> {title && title} </p>
      {/* <p> {detail && detail} </p> */}
      {/* <p> {image && image} </p> */}
      {/* <p> {eligibilityCount} </p> */}
      <button onClick={() => setSelectedReward(reward)}> edit</button>
      <button onClick={() => handleDeleteReward()}> delete </button>
    </div>
  );
};

export default RewardItem;
