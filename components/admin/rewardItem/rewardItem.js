import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '../../../styles/admin.module.scss';

const RewardItem = ({
  title,
  detail,
  image,
  eligibilityCount,
  setSelectedReward,
  reward,
  setRewards,
  session
}) => {
  const handleDeleteReward = async () => {
    try {
      await axios({
        method: 'post',
        url: '/api/rewards-delete',
        data: {
          title: reward.title,
          signature: session && session.signature,
          typedData: session && session.typedData
        },
      });
      setRewards(null);
      alert('Successfully Deleted');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.reward}>
      <div className={styles.rewardDetails}>
        <span className={styles.rewardImg}>
          {/* <Image src={""} height={16} width={16} alt={''} /> */}
        </span>

        <span className={styles.rewardTitle}>
          <h6> {title && title} </h6>
          <p> {detail && detail} </p> 
        </span>
      </div>

      {/* <p> {detail && detail} </p> */}
      {/* <p> {image && image} </p> */}
      {/* <p> {eligibilityCount} </p> */}

      <div className={styles.rewardCta}>
        <button
          style={{ background: '#3D0DDF' }}
          onClick={() => setSelectedReward(reward)}
        >
          <Image src={'/Images/editIcon.svg'} height={16} width={16} alt={''} />
        </button>
        <button
          style={{ background: '#39B5DC' }}
          onClick={() => handleDeleteReward()}
        >
          <Image
            src={'/Images/deleteIcon.svg'}
            height={16}
            width={16}
            alt={''}
          />
        </button>
      </div>
    </div>
  );
};

export default RewardItem;
