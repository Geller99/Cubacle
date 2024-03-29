import styles from '../styles/rewards.module.scss';
import Image from 'next/image';
import CubexRewardImg from '../public/Images/claimImageCard.gif';
import CubexXmasImg from '../public/Images/xmasClaim.jpg';
import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useProvider,
} from 'wagmi';
import { testabi } from '../config/testabi';
import { rewardsabi } from '../config/rewardsabi';
import { useContractRead } from 'wagmi';
import { useEffect } from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import Modal from '../components/modal/modal';
import { StakingClaim } from '../components/rewards/stakingclaim';
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
  const [toggleState, setToggleState] = useState(1);
  let myContract = new ethers.Contract(
    '0x53C0340464BB6C3b443dd45459e12D996a247F77',
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

    for (let i = 0; i < tokenIds.length; ++i) {
      console.log(tokenIds[i], output[i]);
      if (output[i] === false) {
        newUnique.push(tokenIds[i]);
      }
      console.log(newUnique);
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
      address: '0x53C0340464BB6C3b443dd45459e12D996a247F77',
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
  }, [tokenIds]);

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

  const toggleTab = (index) => {
    setToggleState(index);
  };
  const claimRewards = [
    {
      rewardImg: CubexRewardImg,
      rewardName: 'Staking Reward',
      rewardDescription: 'Eth Drop Reward For Cubex Cards',
      learnMoreBtn: () => setShowModal(true),
      claimRewardBtn: () => claimRewardsHandler(),
    },
    {
      rewardImg: CubexXmasImg,
      rewardName: 'CubeVerse Christmas Gift',

      rewardDescription: 'Checkout the CubeVerse to Learn More!',
      learnMoreBtn: () => console.log('add a learn more details'),
      claimRewardBtn: () => console.log('rewward2 clicked!'),
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
      <section className={styles.rewardsContainer} id={styles.rewardContainer}>
        <header className={styles.rewardTabs}>
          <span
            className={`${styles.tab} ${
              toggleState === 1 ? styles['activeTab'] : ''
            }`}
            onClick={() => toggleTab(1)}
          >
            Active Claims
            <span>02</span>
          </span>
          <div className={styles.spacer}></div>
          <span
            className={`${styles.tab} ${
              toggleState === 2 ? styles['activeTab'] : ''
            }`}
            onClick={() => toggleTab(2)}
          >
            Previous Claims <span>00</span>
          </span>
        </header>
        <main
          className={`${styles['rewards']} ${
            toggleState === 1 ? styles['activeRewards'] : ''
          }`}
        >
          {/* <header>
            <h4>Active Claims</h4>
          </header> */}
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
                    onClick={claimreward.learnMoreBtn}
                  >
                    {' '}
                    Learn More{' '}
                  </button>

                  <button
                    className={styles.amount}
                    onClick={claimreward.claimRewardBtn}
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

        <main
          className={`${styles['rewards']} ${
            toggleState === 2 ? styles['activeRewards'] : ''
          }`}
        >

          <div className={styles.nullContainer}>
            <div>
              <Image
                src="/Images/nullIcon.svg"
                height={200}
                width={200}
                alt={''}
              />

              <h3>No Previous Claims</h3>
            </div>
          </div>
          {/* {claimRewards.map((claimreward, idx) => {
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
                    onClick={claimreward.learnMoreBtn}
                  >
                    {' '}
                    Learn More{' '}
                  </button>

                  <button
                    className={styles.amount}
                    onClick={claimreward.claimRewardBtn}
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
          })} */}
        </main>
      </section>
    </div>
  );
};

export default ClaimRewards;
