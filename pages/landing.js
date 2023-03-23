import React, { useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import styles from '../styles/landing.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

const {
  recoverTypedSignature,
  SignTypedDataVersion,
} = require("@metamask/eth-sig-util");


// 60 seconds * 60 minutes = 3600 = 1 hour
const SESSION_LIFETIME = 3600;

const Landing = () => {
  const router = useRouter();
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  
  const [authStatus, setAuthStatus] = useState(null);
  const [sessionState, setSessionState] = useState();
  const [scrollLeft, setScrollLeft] = useState(0);

  const user = address;


  const createTypedData = () => {
    const typedData = {
      domain: {
        name: "Cubicle Dashboard Approval",
        version: "1",
        chainId: 1,
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
      },
      message: {
        account: address.toLowerCase(),
        timestamp: Math.round(Date.now() / 1000),
        title: "The Cubicle",
        contents:
          "Welcome to the Cubicle, this signature ensures our systems can verify ownership of Cubex NFTs for members who wish to participate in staking, voting and rewards activities",
      },
      primaryType: "Message",
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "version", type: "string" },
          { name: "verifyingContract", type: "address" },
        ],
        Message: [
          { name: "account", type: "address" },
          { name: "timestamp", type: "uint32" },
          { name: "title", type: "string" },
          { name: "contents", type: "string" },
        ],
      },
    };
    return typedData;
  };

  const fetchAuthStatus = async (session) => {
    try{
      const [data, err] = await axios({
        method: "post",
        url: "/api/auth",
        headers: {},
        data: session,
      });

      //TODO: is valid?

      console.log("User Status Data", data.data.data.authStatus);
      setAuthStatus(data.data.data.authStatus);
      return true;
    }
    catch(err){
      console.log({ err });
      return false;
    }
  };

  const getSession = () => {
    if(sessionState){
      if(isValidSession(sessionState))
        return sessionState;
    }

    //TODO: get sessionStorage();
    const sessionJSON = localStorage.getItem(address.toLowerCase());
    if(sessionJSON){
      let sessionStorage = null;
      try{
        sessionStorage = JSON.parse(sessionJSON);
      }
      catch(err){
        return null;
      }

      if(isValidSession(sessionStorage))
        return sessionStorage;
    }

    return null;
  };

  const getSessionExpiration = (session) => {
    return session.typedData.message.timestamp + SESSION_LIFETIME;
  };

  const isValidSession = (session) => {
    if(isValidSignature(session)){
      const created = session.typedData.message.timestamp;
      const expires = created + SESSION_LIFETIME;
      const now = Math.round(Date.now() / 1000);
      return expires > now;
    }

    return false;
  };

  const isValidSignature = (session) => {
    try{
      console.log({ session });
      const signer = recoverTypedSignature({
        data:      session.typedData,
        signature: session.signature,
        version:   SignTypedDataVersion.V4,
      });

      return signer.toLowerCase() == session.typedData.message.account.toLowerCase();
    }
    catch(err){
      console.warn({ err });

      return false;
    }
  };

  const requestSignature = async (typedData) => {
    const json = JSON.stringify(typedData);
    const request = {
      method: "eth_signTypedData_v4",
      from: address,
      params: [address, json],
    };
    const provider = await connector.getProvider();
    return (await provider.request(request));
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
    if (address){
      let session = getSession();
      if(isValidSession(session)){
        const ts = getSessionExpiration(session);
        const dt = new Date(ts * 1000);
        console.info(`Existing session expires at ${dt.toISOString()}`);

        //TODO: isEqual
        if(session !== sessionState)
          setSessionState(session);

        return;
      }
      else if(connector){
        const typedData = createTypedData();
        const signature = await requestSignature(typedData);
        if(await fetchAuthStatus(signature)){
          const session = {
            typedData,
            signature
          };

          const ts = getSessionExpiration(session);
          const dt = new Date(ts * 1000);
          console.info(`New session expires at ${dt.toISOString()}`);

          localStorage.setItem(address.toLowerCase(), JSON.stringify(session));
          setSessionState(session);
          return;
        }
      }

      //default
      localStorage.removeItem(address.toLowerCase());
      setSessionState(null);
      disconnect();
    }
  };

  useEffect(() => {
    handleInit();
  }, [address, connector]);



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
