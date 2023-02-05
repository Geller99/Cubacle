
import RewardItem from "./rewardItem/rewardItem";

/**
 *
 * @returns list of all active rewards
 */

const ActiveRewards = ({ rewards, setRewards, setSelectedReward }) => {
  
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
              setRewards={setRewards}
              
            />
          );
        })}
    </div>
  );
};

export default ActiveRewards;
