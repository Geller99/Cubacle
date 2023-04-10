import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import {useDisconnect} from 'wagmi';

import ActiveProposals from "../../components/admin/proposal-active";
import CreateProposalForm from "../../components/admin/proposal-form";
import CreateRewardForm from "../../components/admin/reward-form";
import ActiveRewards from "../../components/admin/rewards-active";
import TokenItem from "../../components/admin/tokenItem/tokenItem";
import styles from "../../styles/admin.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { MyStore } from "../../state/myStore";

const Admin = () => {
  const [selectedReward, setSelectedReward] = useState(null);
  const [rewards, setRewards] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposals, setProposals] = useState(null);
  const [tokenData, setTokenData] = useState(null);
  const [count, setCount] = useState(0);
  const session = useContext(MyStore);
  const router = useRouter();

  const { disconnect } = useDisconnect();

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


  // @see Layout.js
  const handleInit = async () => {
    //session.init(disconnect);

    if (await session.isValid())
      return;


    const isConnected = await session.start();
    if(!isConnected){
      //cleanup
      if(session.address || session.connector){
        await disconnect();
      }
      
      await session.stop(true);
    }
  };


  /**
   * @dev protects admin route via existing signature and auth status
   */
  useEffect(() => {
    async () => {
      await handleInit();
      session.authStatus === "Admin" ? null : router.push('/')
    }
  }, []);


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
        url: "/api/fetchUserData",
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
    <div className={styles.adminContainer}>
      <div className={styles.AdminNav}>
        <p> TFG Overview: </p>
        <div className={styles.adminCta}>
          <button
            id={styles.createProposal}
            onClick={() => setSelectedProposal({})}
          >
            Create New Proposal
          </button>
          <button
            id={styles.createReward}
            onClick={() => setSelectedReward({})}
          >
            Create New Reward
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

      <div className={styles.adminOverviewContainer}>
        <div className={styles.userSummary}>
          <header>
            <h6>User Summary</h6>

            <Image
              className={styles.icon}
              src={"/Images/moreIcon.svg"}
              height={20}
              width={20}
              alt={""}
            />
          </header>

          <div>
            <span>
              <aside>
                <Image
                  className={styles.icon}
                  src={"/Images/qtyHandIcon.svg"}
                  height={36}
                  width={36}
                  alt={""}
                />
              </aside>

              <p>Quantity In Hand</p>
              <h4>214</h4>
            </span>

            <span>
              <aside>
                <Image
                  className={styles.icon}
                  src={"/Images/willRecieveIcon.svg"}
                  height={36}
                  width={36}
                  alt={""}
                />
              </aside>

              <p>Will Be Recieved</p>
              <h4>214</h4>
            </span>
          </div>
        </div>

        <div className={styles.userSummary}>
          <header>
            <h6>Reward Details</h6>

            <Image
              className={styles.icon}
              src={"/Images/moreIcon.svg"}
              height={20}
              width={20}
              alt={""}
            />
          </header>

          <div className={styles.rewardInfo}>
            <span>
              <p>Total Active Rewards</p>
              <h5>02</h5>
            </span>

            <span>
              <p>Total Past Rewards</p>
              <h5>02</h5>
            </span>

            <span id={styles.upcomingRewards}>
              <p>Total Upcoming Rewards</p>
              <h5>02</h5>
            </span>
          </div>
        </div>

        <div className={styles.userSummary}>
          <header>
            <h6>No. Of Eligible Voters</h6>

            <Image
              className={styles.icon}
              src={"/Images/moreIcon.svg"}
              height={20}
              width={20}
              alt={""}
            />
          </header>

          <div>
            <span>
              <aside>
                <Image
                  className={styles.icon}
                  src={"/Images/totalCustomersIcon.svg"}
                  height={36}
                  width={36}
                  alt={""}
                />
              </aside>

              <p>Total Customers</p>
              <h4>214</h4>
            </span>

            <span>
              <aside>
                <Image
                  className={styles.icon}
                  src={"/Images/supplierIcon.svg"}
                  height={36}
                  width={36}
                  alt={""}
                />
              </aside>

              <p>Total Suppliers</p>
              <h4>214</h4>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.ProposalsRewardsContainer}>
        <div className={styles.activeProposalsContainer}>
          <header>
            <h6>Active Proposals</h6>

            <Image
              className={styles.icon}
              src={"/Images/moreIcon.svg"}
              height={20}
              width={20}
              alt={""}
            />
          </header>
          <div className={styles.ActiveProposal}>
            <ActiveProposals
              proposals={proposals}
              setProposals={setProposals}
              setSelectedProposal={setSelectedProposal}
            />
          </div>
        </div>

        <div className={`${styles.activeRewardsContainer}`}>
          <header>
            <h6>Rewards</h6>

            <Image
              className={styles.icon}
              src={"/Images/moreIcon.svg"}
              height={20}
              width={20}
              alt={""}
            />
          </header>

          <div className={styles.ActiveRewards}>
            <ActiveRewards
              rewards={rewards}
              setRewards={setRewards}
              setSelectedReward={setSelectedReward}
            />
          </div>
        </div>
      </div>

      <div className={styles.adminSearchBarContainer}>
        <span>
          <h6>Listed Users</h6>
        </span>

        <div className={styles.adminSearchBar}>
          <span>
            <input
              type={"text"}
              name="count"
              value={count}
              placeholder="search users by listing count"
              onChange={(e) => setCount(e.target.value)}
            />
          </span>
          <Image
            className={styles.icon}
            src={"/Images/searchIcon.svg"}
            height={30}
            width={30}
            alt={""}
          />
        </div>
      </div>

      <div className={styles.adminTokemInfoContainer}>
        <header>
          <h6>User Data</h6>

          <Image
            className={styles.icon}
            src={"/Images/moreIcon.svg"}
            height={20}
            width={20}
            alt={""}
          />
        </header>
        <div className={styles.adminTokenInfo}>
          <div className={styles.listHead}>
            <span>Wallet Address</span>
            <span>Token ID</span>
            <span>Staking Count</span>
            <span>Status</span>
          </div>
          {console.log("===Admin Auth Check===", session.authStatus)}
        

          <div className={styles.listContainer}>
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
      </div>
    </div>
  );
};

export default Admin;
