import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import styles from '../styles/landing.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Landing = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(address);
  }, [address]);

  return (
    <section className={styles.container}>
      <main>
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
            <h3>Vote</h3>
            <p>Click here to Vote on Active Proposals For CubexDAO...</p>
          </span>
        </div>

        <div
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

          <span>
            <h3>Admin</h3>
            <p>Click here to Access Your Admin Dashboard TFG...</p>
          </span>
        </div>
      </main>

      <span className={styles.scrollIcon}>
        <span className={styles.scrollIconWheelOuter}>
          <span className={styles.scrollIconWheelInner}></span>
        </span>
      </span>
    </section>
  );
};

export default Landing;
