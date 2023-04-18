import RewardItem from "./rewardItem/rewardItem";
import styles from '../../styles/admin.module.scss'
/**
 *
 * @returns list of all active rewards
 */

const ActiveRewards = ({ rewards, setRewards, setSelectedReward, session}) => {
  return (
    <div className={styles.rewardContainer}>
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
              session={session}
              
            />
          );
        })}
    </div>
  );
};

export default ActiveRewards;
