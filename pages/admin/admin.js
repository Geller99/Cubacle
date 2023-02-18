import axios from "axios";
import React, { useState, useEffect } from "react";
import ActiveProposals from "../../components/admin/proposal-active";
import CreateProposalForm from "../../components/admin/proposal-form";
import CreateRewardForm from "../../components/admin/reward-form";
import ActiveRewards from "../../components/admin/rewards-active";
import TokenItem from "../../components/admin/tokenItem/tokenItem";

const Admin = () => {
  
  const [selectedReward, setSelectedReward] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposals, setProposals] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!rewards) {
      fetchActiveRewards();
    }
  }, [rewards]);

  useEffect(() => {
    if (!proposals) {
      fetchActiveProposals();
    }
  }, [proposals]);

  const fetchActiveRewards = async () => {
    try {
      await fetch("/api/rewards-getAll")
        .then((res) => res.json())
        .then((data) => {
          console.log("Rewards data", data);
          setRewards(data.data);
        });
    } catch (error) {
      console.log("Rewards Fetch Error, error");
    }
  };

  const fetchActiveProposals = async () => {
    try {
      await fetch("/api/proposal-getAll")
        .then((res) => res.json())
        .then((data) => {
          console.log("Proposal data", data);
          setProposals(data.data);
        });
    } catch (error) {
      console.log("Proposal error", error);
    }
  };

  const fetchTokenData = async () => {
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/fetchUserData",
        data: {
          count: count ? count : 0,
          fetchListedOwners: null,
          fetchUnlistedOwners: null,
        },
      }).then((data) => {
        console.log("Token Data", data.data.data.tokenData);
        setTokenData(data.data.data.tokenData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (count) {
      fetchTokenData();
    }
  }, [count]);

  return (
    <div>
      <div className="Admin-Nav">
        <p> Welcome to Your Dashboard TFG </p>
        <div>
          <button onClick={() => setSelectedProposal({})}>
            {" "}
            Create New Proposal{" "}
          </button>
          <button onClick={() => setSelectedReward({})}>
            {" "}
            Create New Reward{" "}
          </button>
        </div>
      </div>

      {selectedReward && (
        <CreateRewardForm
          selectedReward={selectedReward}
          setSelectedReward={setSelectedReward}
          setRewards={setRewards}
        />
      )}

      {selectedProposal && (
        <CreateProposalForm
          selectedProposal={selectedProposal}
          setSelectedProposal={setSelectedProposal}
          setProposals={setProposals}
        />
      )}

   
   <div className="Active-Rewards">
        <ActiveRewards
          rewards={rewards}
          setRewards={setRewards}
          setSelectedReward={setSelectedReward}
        />
      </div>


      <div className="Active-Proposal">
        <ActiveProposals
          proposals={proposals}
          setProposals={setProposals}
          setSelectedProposal={setSelectedProposal}
        />
      </div>

      <div className="Admin-SearchBar">
        <input
          type={"text"}
          name="count"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

     
    


      <div className="Admin-TokenInfo">
        {tokenData &&
          tokenData.slice(0, 5).map((token) => {
            return (
              <TokenItem
                key={token.tokenId}
                tokenId={token.tokenId}
                ownerAddress={token.ownerAddress}
                listingStatus={token.listingStatus}
                numberOfDaysListed={token.numberOfDaysListed}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Admin;
