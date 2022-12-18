import React from "react";

export const StakingClaim = ({ setShowModal, claimRewardsHandler, unique }) => {
  const totalPay = unique.length * 11;

  return (
    <div>
      <p>
        This claim will redeem .085 ETH per CubeX Card in your wallet. You will
        only be able to claim once per wallet and once per card. Gas may vary,
        but if you are patient you could find a time for under $0.50 in gas.
      </p>

      <br />

      <div>
        {" "}
        Your total pay for {unique.length} tokens is ${totalPay}{" "}
      </div>

      <br />

      <button onClick={() => claimRewardsHandler()}> Claim </button>
      <button onClick={() => setShowModal(false)}> Close </button>
    </div>
  );
};
