import React from 'react';
import styles from '../../styles/modal.module.scss'; 
export const StakingClaim = ({ setShowModal, claimRewardsHandler, unique }) => {
  const totalPay = unique.length * 11;

  return (
    <div className={styles.contentContainer}>
      <p>
        This claim will redeem .0085 ETH per CubeX Card in your wallet. You will
        only be able to claim once per wallet and once per card. Gas may vary,
        but if you are patient you could find a time for under $0.50 in gas.
      </p>

      <br />

      <main>
        {' '}
        Your total pay for {unique.length} tokens is ${totalPay}{' '}
      </main>

      <br />
      <span>
      <button className={styles.closeBtn} onClick={() => setShowModal(false)}> Close </button>
        <button className={styles.connectBtn} onClick={() => claimRewardsHandler()}> Claim </button>

      </span>
    </div>
  );
};
