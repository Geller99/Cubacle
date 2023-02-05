import { useState } from "react";
import { useEffect } from "react";
import RewardItem from "./rewardItem/rewardItem";

/**
 *
 * @returns list of all active rewards
 */

const ActiveRewards = ({setSelectedReward}) => {
  const [rewards, setRewards] = useState(null);

  /**
   * @dev will run this effect everytime a new form is created or a previous one is updated
   */
  useEffect(() => {
    fetchActiveRewards();
  }, []);

  const fetchActiveRewards = async () => {
    await fetch("/api/rewards-getAll")
      .then((res) => res.json())
      .then((data) => {
        console.log("Rewards data", data);
        setRewards(data.data);
      });
  };

  return (
    <div>
      {rewards &&
        rewards.map((reward) => {
          return (
            <RewardItem
              key={reward.title}
              title={reward.title}
              detail={reward.detail}
              image={reward.image}
              eligibilityCount={reward.eligibilityCount}
              setSelectedReward={setSelectedReward && setSelectedReward}
              reward={reward}
            />
          );
        })}
    </div>
  );
};

export default ActiveRewards;
