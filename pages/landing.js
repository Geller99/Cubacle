import React, { useState, useEffect } from 'react';
import Profile from '../components/profile/profile';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import landingStyles from '../styles/landing.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Landing = () => {

  const router = useRouter();
  const accountValidator = false;
  const { address } = useAccount();
  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(address);
  }, [address]);


  return (
    <section className={landingStyles.container}>
      <main>
        <div className={landingStyles.nfts} onClick={() => user ? router.push('/assets'): alert("Please connect wallet") }>
          <Image
            className={landingStyles.icon}
            src={'/Images/1Icon.png'}
            height={80}
            width={80}
            alt={''}
          />

          <span>
            <h3>Your NFTS</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          </span>
        </div>

        <div className={landingStyles.roadmap} onClick={() => router.push('/')}>
          <Image
            className={landingStyles.icon}
            src={'/Images/2Icon.png'}
            height={80}
            width={80}
            alt={''}
          />

          <span>
            <h3>Roadmap</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          </span>
        </div>

        <div className={landingStyles.rewards} onClick={() => router.push('/rewards/rewards')}>
          <Image
            className={landingStyles.icon}
            src={'/Images/3Icon.png'}
            height={76}
            width={62}
            alt={''}
          />

          <span>
            <h3>Rewards</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          </span>
        </div>

        <div className={landingStyles.claimRewards} onClick={() => router.push('/rewards/claim')}>
          <Image
            className={landingStyles.icon}
            src={'/Images/4Icon.png'}
            height={70}
            width={70}
            alt={''}
          />

          <span>
            <h3>Claim Rewards</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          </span>
        </div>

        <div className={landingStyles.shop} onClick={() => router.push('/')}>
          <Image
            className={landingStyles.icon}
            src={'/Images/5Icon.png'}
            height={80}
            width={80}
            alt={''}
          />

          <span>
            <h3>Shop</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
          </span>
        </div>
      </main>

    </section>
  );
};

export default Landing;
