import React from 'react';
import styles from '../../styles/rewards.module.scss';
import Image from 'next/image';

const Rewards = () => {
  const rewardsList = [
    {
      rewardImg: '',
      rewardName: 'Reward name',
      rewardDescription: 'Reward long description goes here',
      rewardAmount: 2000,
    },

    {
      rewardImg: '',
      rewardName: 'Reward name',
      rewardDescription: 'Reward long description goes here',
      rewardAmount: 2000,
    },

    {
      rewardImg: '',
      rewardName: 'Reward name',
      rewardDescription: 'Reward long description goes here',
      rewardAmount: 2000,
    },

    {
      rewardImg: '',
      rewardName: 'Reward name',
      rewardDescription: 'Reward long description goes here',
      rewardAmount: 2000,
    },

    {
      rewardImg: '',
      rewardName: 'Reward name',
      rewardDescription: 'Reward long description goes here',
      rewardAmount: 2000,
    },

    {
      rewardImg: '',
      rewardName: 'Reward name',
      rewardDescription: 'Reward long description goes here',
      rewardAmount: 2000,
    },

    {
      rewardImg: '',
      rewardName: 'Reward name',
      rewardDescription: 'Reward long description goes here',
      rewardAmount: 2000,
    },
  ];
  return (
    <div className={styles.container}>
      <main className={styles.rewards}>
        {rewardsList.map((reward, idx) => {
          return (
            <div className={styles.reward} key={reward.rewardName}>
              <div className={styles.rewardDetails}>
                <Image src={reward.rewardImg} height={92} width={92} alt={''} />

                <span>
                  <h6>{reward.rewardName}</h6>
                  <p>{reward.rewardDescription}</p>
                </span>
              </div>

              <button className={styles.amount}>
                <Image
                  className={styles.icon}
                  src={'/Images/rewardIcon.svg'}
                  height={22}
                  width={22}
                  alt={''}
                />
                <p>{reward.rewardAmount}</p>
              </button>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default Rewards;
