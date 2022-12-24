import styles from '../../styles/rewards.module.scss';
import Image from 'next/image';
import CubexRewardImg from '../../public/Images/claimImageCard.gif';
import CubexXmasImg from '../../public/Images/xmasClaim.jpg';
import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useProvider,
} from 'wagmi';
import { testabi } from '../../config/testabi';
import { rewardsabi } from '../../config/rewardsabi';
import { useContractRead } from 'wagmi';
import { useEffect } from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import Modal from '../../components/modal/modal';
import { StakingClaim } from '../../components/rewards/stakingclaim';
// import { element } from '@rainbow-me/rainbowkit/dist/css/reset.css';

/**
 *
 * @returns a component for claiming rewards based on staked NFTs
 * displays amount the user is making per claim
 * tells you what tokens have already been claimed
 * shows total
 *
 *
 */

const ClaimRewards = () => {
  const { address } = useAccount();
  const provider = useProvider();
  const [tokenIds, setTokenIds] = useState([]);
  const [unique, setUnique] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  let myContract = new ethers.Contract(
    '0x4F4c1A5A493b91D1F79A0c82e31e5e11850D3aA2',
    rewardsabi,
    provider
  );

  // check if all tokens in tokenIds are claimed already
  // if token is claimed, remove from eligible tokens array
  // take eligible tokens.length and pass to total pay to inform user
  // if all tokens in wallet are already claimed, user cannot claim again
  // pop-up modal

  // map over tokenIds and check if token is T/F
  const bulkCheck = async () => {
    const promises = tokenIds.map((token) => {
      return threeTry(() => {
        return myContract.tokens(parseInt(token));
      }, token);
    });

    const output = await Promise.all(promises);
    const newUnique = [...unique];
   
    for(let i = 0; i < tokenIds.length; ++i ){
      console.log(tokenIds[i], output[i])
      if(output[i] === false){
        newUnique.push(tokenIds[i]);
      }
      console.log(newUnique)
    }
    setUnique(newUnique);
  };

  const threeTry = (callback, token) => {
    return new Promise(async (resolve, reject) => {
      let lastError;
      for (let i = 0; i < 1; ++i) {
        try {
          const result = await callback();
          resolve(result);
          return;
        } catch (err) {
          lastError = err;
        }
      }
      reject(lastError);
    });
  };

  const { config: tokenFetchConfig, error: tokenFetchError } = useContractRead({
    address: '0x8661cD0C4A3fD3Dc6B31cD24B20368851749Df00',
    abi: testabi,
    functionName: 'getOwnerTokens',
    args: [address && address],
    onSuccess: (data) => {
      setTokenIds(data.map((el) => el.toString()));
      console.log(
        'Founder owned tokens!',
        data.map((el) => el.toString())
      );
    },
  });
  const { write: fetchTokenIds } = useContractWrite(tokenFetchConfig);

  /**
   * @dev setup contract write for claimRewards
   */

  const { config: claimRewardsConfig, error: claimRewardsError } =
    usePrepareContractWrite({
      address: '0x4F4c1A5A493b91D1F79A0c82e31e5e11850D3aA2',
      abi: rewardsabi,
      functionName: 'claimRewards',
      args: [tokenIds.map((el) => parseInt(el))],
      onSuccess: (data) => {
        console.log('Approved Tokens!');
      },
      onError: (error) => {
        console.log(error);
        setError('Claim Not Allowed at this time');
      },
    });
  const { writeAsync: claim } = useContractWrite(claimRewardsConfig);

  useEffect(() => {
    fetchTokenIds?.();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    bulkCheck();
  },[tokenIds]);


  const claimRewardsHandler = async () => {
    if (tokenIds.length < 1) {
      alert('You do not own any Cubex Cards');
      return;
    }
    if (unique.length < 1) {
      alert('All of your tokens have been claimed');
      return;
    }
    let totalPay = unique.length * 11;
    alert(`Your claim for the CubeX staking rewards is $${totalPay}`);
    console.log('User Token List', unique);

    try {
      await claim?.();
      if (error) alert(error);
    } catch (error) {
      console.log(error);
    }
  };

  const claimRewards = [
    {
      rewardImg: CubexRewardImg,
      rewardName: 'Staking Reward',
      rewardDescription: 'Eth Drop Reward For Cubex Cards',
      onClick: () => claimRewardsHandler(),
    },
    {
      rewardImg: CubexXmasImg,
      rewardName: 'CubeVerse Christmas Gift',
      rewardDescription: 'Eth Drop Reward For Cubex Cards',
      onClick: () => console.log('rewward2 clicked!'),
    },
  ];



  return (
    <div className={styles.container}>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <StakingClaim
          setShowModal={setShowModal}
          claimRewardsHandler={claimRewardsHandler}
          unique={unique}
        />
      </Modal>

      <main className={styles.rewards}>
        {claimRewards.map((claimreward, idx) => {
          return (
            <div className={styles.reward} key={claimreward.rewardName}>
              <div className={styles.rewardDetails}>
                <Image
                  src={claimreward.rewardImg}
                  height={92}
                  width={92}
                  alt={''}
                />
                <span>
                  <h6>{claimreward.rewardName}</h6>
                  <p>{claimreward.rewardDescription}</p>
                </span>
              </div>

              <span className={styles.claimRewardCta}>
                <button
                  className={styles.learnMore}
                  onClick={() => setShowModal(true)}
                >
                  {' '}
                  Learn More{' '}
                </button>

                <button
                  className={styles.amount}
                  onClick={claimreward.onClick}
                >
                  <Image
                    className={styles.icon}
                    src={'/Images/4Icon.png'}
                    height={22}
                    width={22}
                    alt={''}
                  />
                  <p>Claim</p>
                </button>
              </span>
             
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default ClaimRewards;
