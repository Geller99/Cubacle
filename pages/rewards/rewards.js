import React, { useState, useEffect } from "react";
import styles from "../../styles/rewards.module.scss";
import Image from "next/image";

const Rewards = () => {
  const [rewards, setRewards] = useState(null);

  const fetchActiveRewards = async () => {
    await fetch("/api/rewards-getAll")
      .then((res) => res.json())
      .then((data) => {
        console.log("Rewards data", data);
        setRewards(data.data);
      });
  };

  useEffect(() => {
    fetchActiveRewards();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.rewards}>
        {rewards &&
          rewards.map((reward, idx) => {
            return (
              <div className={styles.reward} key={reward.title}>
                <div className={styles.rewardDetails}>
                  <img src={reward.image}  height={92} width={92} alt={""} />

                  <span>
                    <h6>{reward.title}</h6>
                    <p>{reward.detail}</p>
                  </span>
                </div>
                <span>
                  <button className={styles.amount}>
                    <p> {reward.eligibilityCount} Days</p>
                  </button>
                </span>
              </div>
            );
          })}
      </main>
    </div>
  );
};

export default Rewards;
