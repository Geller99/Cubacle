import React, { useState, useEffect, useRef} from 'react';
import { useRouter } from 'next/router';
import {useDisconnect} from 'wagmi';
import { useStore } from '../state/useStore';

import styles from '../styles/landing.module.scss';
import Image from 'next/image';




const Landing = () => {
  const router = useRouter();
  const session = useStore();
  const [scrollLeft, setScrollLeft] = useState(0);
  const { disconnect } = useDisconnect();

  const user = session.address;

  /**
   * @dev needs to
   *
   * Connect user wallet
   * Run function to grab signature from user using EIP typedData()
   * Check if user signs or not
   *
   * IF signed, hit /api/auth to determine admin/user status give access to dapp and stay logged in
   * Else disconnect
   */

  // Logic:
  // premise: we don't know the address until the provider is connected
  //   so we'll wait for the address to exist
  // 1. when we have the address, check if a signature exists
  // 2. if it exists, check if it's valid
  // 3. if it's valid, we can add this to state
  // else. generate a new signature
  //
  // NOTE: we need to keep the data so that the timstamp doesn't change
  const handleInit = async () => {
    if (await session.isValid())
      return;


    const isConnected = await session.start();
    if(!isConnected){
      //cleanup
      if(session.address || session.connector){
        await disconnect(); 
        session.setAuthStatus(null);
      }
      await session.stop(true);
    }
  };


  // always check
  useEffect(() => {
    handleInit();
  });




  const mainLaRef = useRef(null);
  const handleClick = (direction) => {
    setScrollLeft((prevScrollLeft) => prevScrollLeft + direction * 200);
    mainLaRef.current.scrollLeft += direction * 200;
  };

  return (
    <div className={styles.landingContainer}>
      <section className={styles.container}>
        <main ref={mainLaRef} className={styles.main}>
          <div
            className={styles.nfts}
            onClick={() =>
              user ? router.push('/assets') : alert('Please connect wallet')
            }
          >
            <Image
              className={styles.icon}
              src={'/Images/1Icon.png'}
              height={80}
              width={80}
              alt={''}
            />

            <span>
              <h3>Your NFTS</h3>
              <p>Click here to see all your Cubex NFTs and Assets...</p>
            </span>
          </div>

          <div
            className={styles.roadmap}
            onClick={() =>
              user ? router.push('/roadmap') : alert('Please connect wallet')
            }
          >
            <Image
              className={styles.icon}
              src={'/Images/2Icon.png'}
              height={80}
              width={80}
              alt={''}
            />

            <span>
              <h3>Roadmap</h3>
              <p>Keep up with the team at Cubex, checkout our roadmap!...</p>
            </span>
          </div>

          <div
            className={styles.rewards}
            onClick={() =>
              user
                ? router.push('/rewards/rewards')
                : alert('Please connect wallet')
            }
          >
            <Image
              className={styles.icon}
              src={'/Images/3Icon.png'}
              height={76}
              width={62}
              alt={''}
            />

            <span>
              <h3>Rewards</h3>
              <p>Explore upcoming rewards for the community...</p>
            </span>
          </div>

          <div
            className={styles.claimRewards}
            onClick={() =>
              user
                ? router.push('/rewards/claim')
                : alert('Please connect wallet')
            }
          >
            <Image
              className={styles.icon}
              src={'/Images/4Icon.png'}
              height={70}
              width={70}
              alt={''}
            />

            <span>
              <h3>Claim</h3>
              <p>Explore and Claim Your CubeX Rewards Here!...</p>
            </span>
          </div>

          <div
            className={styles.shop}
            onClick={() =>
              user ? router.push('/') : alert('Please connect wallet')
            }
          >
            <Image
              className={styles.icon}
              src={'/Images/5Icon.png'}
              height={80}
              width={80}
              alt={''}
            />

            <span>
              <h3>Shop</h3>
              <p>The Official CubeX Shop for Holders, Coming Soon...</p>
            </span>
          </div>

        <div
          className={styles.nfts}
          onClick={() =>
            user ? router.push('/feed') : alert('Please connect wallet')
          }
        >
          <Image
            className={styles.icon}
            src={'/Images/1Icon.png'}
            height={80}
            width={80}
            alt={''}
          />

          <span>
            <h3>Vote</h3>
            <p>Click here to Vote on Active Proposals For CubexDAO...</p>
          </span>
        </div>

        {
          session.authStatus === "Admin" ? <div
          className={styles.nfts}
          onClick={() =>
            user ? router.push('/admin/admin') : alert('Please connect wallet')
          }
        >
          <Image
            className={styles.icon}
            src={'/Images/1Icon.png'}
            height={80}
            width={80}
            alt={''}
          />

          {console.log("Auth Status", session.authStatus )}

          <span>
            <h3>Admin</h3>
            <p>Click here to Access Your Admin Dashboard For The Cubicle TFG...</p>
          </span>
        </div> : <></>
        }
      </main>

        {/* <span className={styles.scrollIcon}>
        <span className={styles.scrollIconWheelOuter}>
          <span className={styles.scrollIconWheelInner}></span>
        </span>
      </span> */}
      </section>
      <span className={styles.scrollBtn}>
        <button onClick={() => handleClick(-2)}>
          <Image
            className={styles.icon}
            src={'/Images/leftArrow.svg'}
            height={24}
            width={36}
            alt={''}
          />
        </button>

        <button onClick={() => handleClick(2)}>
        <Image
            className={styles.icon}
            src={'/Images/rightArrow.svg'}
            height={24}
            width={36}
            alt={''}
          />
        </button>
      </span>
    </div>
  );
};

export default Landing;
