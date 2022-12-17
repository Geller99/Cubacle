import React from 'react';
import rewardStyles from '../../styles/rewards.module.scss';
import Image from 'next/image';

const rewards = () => {
  const rewards = [
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
    <div className={rewardStyles.container}>
      <main className={rewardStyles.rewards}>
        {rewards.map((reward, idx) => {
          return (
            <div className={rewardStyles.reward} key={reward.rewardName}>
              <div className={rewardStyles.rewardDetails}>
                <Image src={reward.rewardImg} height={92} width={92} alt={''} />

                <span>
                  <h6>{reward.rewardName}</h6>
                  <p>{reward.rewardDescription}</p>
                </span>
              </div>

              <button className={rewardStyles.amount}>
                <Image
                  className={rewardStyles.icon}
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

export default rewards;
