<<<<<<< Updated upstream
import React from "react";

=======
import React from 'react';
import styles from '../../styles/modal.module.scss'; 
>>>>>>> Stashed changes
export const StakingClaim = ({ setShowModal, claimRewardsHandler, unique }) => {
  const totalPay = unique.length * 11;

  return (
<<<<<<< Updated upstream
    <div>
=======
    <div className={styles.contentContainer}>
>>>>>>> Stashed changes
      <p>
        This claim will redeem .085 ETH per CubeX Card in your wallet. You will
        only be able to claim once per wallet and once per card. Gas may vary,
        but if you are patient you could find a time for under $0.50 in gas.
      </p>

      <br />

<<<<<<< Updated upstream
      <div>
        {" "}
        Your total pay for {unique.length} tokens is ${totalPay}{" "}
      </div>

      <br />

      <button onClick={() => claimRewardsHandler()}> Claim </button>
      <button onClick={() => setShowModal(false)}> Close </button>
=======
      <main>
        {' '}
        Your total pay for {unique.length} tokens is ${totalPay}{' '}
      </main>

      <br />
      <span>
      <button className={styles.closeBtn} onClick={() => setShowModal(false)}> Close </button>
        <button className={styles.connectBtn} onClick={() => claimRewardsHandler()}> Claim </button>

      </span>
>>>>>>> Stashed changes
    </div>
  );
};
