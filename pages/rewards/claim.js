import rewardStyles from '../../styles/rewards.module.scss';
import Image from 'next/image';
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi'
import { testabi } from '../../config/testabi';
import { rewardsabi } from '../../config/rewardsabi';
import { useContractRead } from 'wagmi'
import { useEffect } from 'react';
import { useState } from 'react';

/**
 *
 * @returns a component for claiming rewards based on staked NFTs
 *
 */

const ClaimRewards = () => {
  const { address } = useAccount();
  const [tokenIds, setTokenIds] = useState([]);
  

  /**
   * @dev fetches token Info from user address
   */

  const { config: tokenFetchConfig , error: tokenFetchError } = useContractRead({
    address: '0x8661cD0C4A3fD3Dc6B31cD24B20368851749Df00',
    abi: testabi,
    functionName: 'getOwnerTokens',
    args:[ address && address ],
    onSuccess: (data) => {
      setTokenIds(data.map((el) => el.toString()))
      console.log("Founder owned tokens!", data.map((el) => el.toString()));
    }
  });
  const { write: fetchTokenIds } = useContractWrite(tokenFetchConfig);


  /**
   * @dev requests setApproval Call for token Transfer
   */

  const { config: approvalConfig , error: approvalError } = usePrepareContractWrite({
    address: '0x8661cD0C4A3fD3Dc6B31cD24B20368851749Df00',
    abi: testabi,
    functionName: 'setApprovalForAll',
    args:[ '0x1331b052f27e981aff245C5DD1a1837CB93Ba532', 'true' ],
    onSuccess: (data) => {
      console.log("Approved Tokens!")
    },
    onError: (error) => {
      console.log(error)
    }
  });
  const { writeAsync: approve } = useContractWrite(approvalConfig);

  /**
   * @dev setup contract write for claimRewards
   */

  const { config: claimRewardsConfig , error: claimRewardsError } = usePrepareContractWrite({
    address: '0x4F4c1A5A493b91D1F79A0c82e31e5e11850D3aA2',
    abi: rewardsabi,
    functionName: 'claimRewards',
    args:[tokenIds.map((el) => parseInt(el))],
    onSuccess: (data) => {
      console.log("Approved Tokens!")
    },
    onError: (error) => {
      console.log(error)
    }
  });
  const { writeAsync: claim } = useContractWrite(claimRewardsConfig);


  useEffect(() => {
    
    fetchTokenIds?.();
    //eslint-disable-next-line
  }, [])

  const claimRewardsHandler = async () => {
    if (tokenIds.length < 1) {
      alert('You do not own any Cubex Cards');
      return;
    }
      console.log("Trigger setApproval");
      try {
        // await approve?.();
        await claim?.();
        alert("Successfully Claimed!");
      } catch (error) {
        console.log(error)
      }
      
  }

  const claimRewards = [
    {
      rewardImg: '',
      rewardName: 'Staking Reward',
      rewardDescription: 'Eth Drop Reward For Cubex Cards',
    }
  ];

  return (
    <div className={rewardStyles.container}>
      <main className={rewardStyles.rewards}>
        {claimRewards.map((claimreward, idx) => {
          return (
            <div className={rewardStyles.reward} key={claimreward.rewardName}>

              <div className={rewardStyles.rewardDetails}>
                <Image src={claimreward.rewardImg} height={92} width={92} alt={''} />
                <span>
                  <h6>{claimreward.rewardName}</h6>
                  <p>{claimreward.rewardDescription}</p>
                </span>
              </div>

              <button className={rewardStyles.amount} onClick={() => claimRewardsHandler()} >
                <Image
                  className={rewardStyles.icon}
                  src={'/Images/4Icon.png'}
                  height={22}
                  width={22}
                  alt={''}
                />
                <p>Claim</p>
              </button>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default ClaimRewards;
