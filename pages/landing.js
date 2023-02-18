import React, { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { domain, types, value } from "../config/EIPValidator";
import styles from '../styles/landing.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

const Landing = () => {
  const router = useRouter();
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const [user, setUser] = useState('');
  const [authStatus, setAuthStatus] = useState(null);
  const [validator, setValidator] = useState(null);

  
  const getTypedData = () => {
    const typedData = {
      domain,
      message: value,
      primaryType: "Message",
      types: {
        ...types,
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "version", type: "string" },
          { name: "verifyingContract", type: "address" },
        ],
      },
    };
    return typedData;
  };

  const requestSignature = () => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!connector) {
          resolve(null);
          return;
        }
        const request = {
          method: "eth_signTypedData_v4",
          from: address,
          params: [address, JSON.stringify(getTypedData())],
        };
        const provider = await connector.getProvider();
        await provider.request(request).then(resolve).catch(reject);
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleSignature = async () => {
    try {
      const signature = await requestSignature();
      if (signature) {
        console.log("Active signature", signature);
        getAuthStatus(signature);
        //const data = await response.json();
        //if(data.isAdmin){
        setValidator(signature);
        //}
      } else {
        //no error, wait for "connector"
      }
    } catch (err) {
      console.warn({ err });
      disconnect();
      setAuthStatus(null);
      setValidator(null);
    }
  };

  const getAuthStatus = async (signature) => {
    axios({
      method: "post",
      url: "/api/auth",
      headers: {},
      data: {
        account: address && address.toLowerCase(),
        signature: signature,
        typedData: getTypedData(),
      },
    })
      .then((data, err) => {
        console.log("User Status Data", data.data.data.authStatus);
        setAuthStatus(data.data.data.authStatus);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

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

  const init = async () => {
    if (address) {
      if (!validator) {
        await handleSignature();
      } else {
        return;
      }
    }
  };

  // useEffect(() => {
  //   init();
  // }, [address, validator]);

  useEffect(() => {
    setUser(address);
  }, [address]);

  const [scrollLeft, setScrollLeft] = useState(0);

  const handleClick = (direction) => {
    const container = document.querySelector(`.${styles.container}`);
    setScrollLeft(scrollLeft + direction * 200);
    container.scrollLeft += direction * 200;
  };
  return (
    <div className={styles.landingContainer}>
      <section className={styles.container}>
        <main className={styles.main}>
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
          authStatus === null ? <div
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
