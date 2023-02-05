import React, { useReducer, useState } from "react";
import ActiveProposals from "../../components/admin/proposal-active";
import CreateRewardForm from "../../components/admin/reward-form";
import ActiveRewards from "../../components/admin/rewards-active";
import { rewardInitialState } from "../../models/rewardReducer";
// import dynamic from 'next/dynamic';

const Admin = () => {

  const [selectedReward, setSelectedReward] = useState(null);

  const [reward, setReward] = useState(selectedReward);

  const handleFormChange = event => {
    const { name, value } = event.target;
    const newReward = {...reward};
    newReward[name] = value;
    setReward(newReward);
  };


  return (
    <div>
      <div className="Admin-Nav">
        <p> Welcome to Your Dashboard TFG </p>
        <div>
          <button> Create New Proposal </button>
          <button onClick={() => setSelectedReward({})}>
            {" "}
            Create New Reward{" "}
          </button>
        </div>
      </div>

      {/**
       * Handle Reward Form Components and Behavior
       */}
      {selectedReward && (
        <CreateRewardForm
          selectedReward={selectedReward}
          setSelectedReward={setSelectedReward}
          reward={reward}
          setReward={setReward}
          handleFormChange={handleFormChange}
        />
      )}

      <div className="Active-Rewards">
        <ActiveRewards setSelectedReward={setSelectedReward} />
      </div>

      <div className="Active-Proposal">
        <ActiveProposals />
      </div>

      <div className="Admin-SearchBar">
        <div> Search Bar </div>
        <button> Show Listed/Unlisted </button>
      </div>
      {console.log(
          "State Values",
          reward && reward.title,
          reward && reward.detail,
          reward && reward.eligibilityCount
        )}
      <div className="Admin-TokenInfo">
        {/**
         * This component displays token Info based on SearchBar
         *
         * Display tokens that have been unListed 30 days etc
         *
         * Click button to show list of all listed/unlisted tokens
         */}
        <div>Token Info</div>
      </div>
    </div>
  );
};

export default Admin;
