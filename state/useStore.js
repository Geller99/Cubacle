import { useState } from "react";
import { useAccount } from "wagmi";

import axios from "axios";

const {
  recoverTypedSignature,
  SignTypedDataVersion,
} = require("@metamask/eth-sig-util");

// 60 seconds * 60 minutes = 3600 = 1 hour
const SESSION_LIFETIME = 3600;

let signaturePromise = null;
export const useStore = () => {
  // public
  const { address: wagmiAddress, connector } = useAccount();

  const [address, setAddress] = useState(null);
  const [authStatus, setAuthStatus] = useState();
  const [userTypedData, setUserTypedData] = useState();

  // private
  const [sessionState, setSessionState] = useState();

  // public
  const isValid = async () => {
    if (!wagmiAddress) {
      if (address) setAddress(null);

      return false;
    }

    // check state first
    const stateSession = getStateSession();
    const storageSession = getStorageSession();
    if (isValidSession(stateSession)) {
      console.debug("stateSession is valid");

      if (!authStatus) {
        const response = await fetchAuthStatus(stateSession);
        if (response?.data?.status === "success") {
          console.debug("update storageSession with stateSession (1)");
          localStorage.setItem(
            wagmiAddress.toLowerCase(),
            JSON.stringify(stateSession)
          );

          console.debug("setAuthStatus (1)");
          setAddress(wagmiAddress);
          setAuthStatus(response.data.data.authStatus);
        }
      } else if (!isMatch(stateSession, storageSession)) {
        console.debug("update storageSession with stateSession (2)");
        localStorage.setItem(
          wagmiAddress.toLowerCase(),
          JSON.stringify(stateSession)
        );
      }

      return true;
    } else {
      console.debug("stateSession is NOT valid", stateSession);
    }

    // check localStorage last
    if (isValidSession(storageSession)) {
      console.debug("storageSession is valid");

      // always revalidate cold storage
      const response = await fetchAuthStatus(storageSession);
      if (response?.data?.status === "success") {
        console.debug("setAuthStatus (2)");

        setAddress(wagmiAddress);
        setAuthStatus(response.data.data.authStatus);

        console.debug("setSessionState");
        setSessionState(storageSession);
        return true;
      }
    }

    console.debug("storageSession is NOT valid", storageSession);
    return false;
  };

  const createTypedData = () => {
    const typedData = {
      domain: {
        name: "Cubicle Dashboard Approval",
        version: "1",
        chainId: 1,
        verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
      },
      message: {
        account: wagmiAddress.toLowerCase(),
        timestamp: getTimestamp(), // seconds
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

  // debounce the signature
  const requestSignature = async (typedData) => {
    try {
      if (!signaturePromise) signaturePromise = _requestSignature(typedData);

      return await signaturePromise;
    } catch (err) {
      return null;
    } finally {
      signaturePromise = null;
    }
  };

  const _requestSignature = (typedData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const json = JSON.stringify(typedData);
        const request = {
          method: "eth_signTypedData_v4",
          from: wagmiAddress,
          params: [wagmiAddress, json],
        };
        const provider = await connector.getProvider();
        const signature = await provider.request(request);
        resolve(signature);
      } catch (err) {
        reject(err);
      }
    });
  };

  const start = async () => {
    console.debug("start");
    if (!wagmiAddress || !connector) {
      //if(address)
      //  setAddress(null);

      return false;
    }

    const typedData = createTypedData();
    const signature = await requestSignature(typedData);
    if (signature) {
      const session = {
        typedData,
        signature,
      };

      const response = await fetchAuthStatus(session);
      if (response?.data?.status === "success") {
        localStorage.setItem(
          wagmiAddress.toLowerCase(),
          JSON.stringify(session)
        );

        setAddress(wagmiAddress);
        setAuthStatus(response.data.data.authStatus);
        setSessionState(session);
        return true;
      }
    }

    // failover
    if (address) setAddress(null);

    return false;
  };

  const stop = async (triggerDisconnect) => {
    console.debug("stop");
    if (wagmiAddress) localStorage.removeItem(wagmiAddress.toLowerCase());

    setAddress(null);
    setAuthStatus(null);
    setSessionState(null);

    if (triggerDisconnect) {
      //disconnect();
    }
  };

  // private
  const fetchAuthStatus = async (session) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/auth",
        headers: {},
        data: session,
      });

      console.log("User Status Response", response);
      return response;
    } catch (err) {
      console.log({ err });
    }

    return null;
  };

  // abstraction
  const getStateSession = () => {
    return sessionState;
  };

  // abstraction
  const getStorageSession = () => {
    try {
      const sessionJSON = localStorage.getItem(wagmiAddress.toLowerCase());
      return JSON.parse(sessionJSON);
    } catch (err) {
      console.warn({ err });
    }

    return null;
  };

  const getTimestamp = () => {
    return Math.round(Date.now() / 1000);
  };

  const isActiveSession = (session) => {
    try {
      const created = session.typedData.message.timestamp;
      const expires = created + SESSION_LIFETIME;
      const datetime = new Date(expires * 1000);
      console.debug(`Session expires at ${datetime.toISOString()}`);

      return expires > getTimestamp();
    } catch (err) {
      console.error({ err });
    }

    return false;
  };

  const isMatch = (sessionA, sessionB) => {
    try {
      if (sessionA.signature !== sessionB.signature) return false;

      const messageA = sessionA.typedData;
      const messageB = sessionB.typedData;
      if (messageA.account !== messageB.account) return false;

      if (messageA.timestamp !== messageB.timestamp) return false;

      // check title / contents?

      return true;
    } catch (err) {
      console.warn({ err });
    }

    return false;
  };

  // abstraction
  const isValidSession = (session) => {
    return isActiveSession(session) && isValidSignature(session);
  };

  const isValidSignature = (session) => {
    try {
      if (!wagmiAddress) return false;

      const account = session.typedData.message.account;
      if (!account) return false;

      if (wagmiAddress.toLowerCase() !== account.toLowerCase()) return false;

      const signer = recoverTypedSignature({
        data: session.typedData,
        signature: session.signature,
        version: SignTypedDataVersion.V4,
      });
      if (!signer) return false;

      return wagmiAddress.toLowerCase() === signer.toLowerCase();
    } catch (err) {
      console.warn({ err });
    }

    return false;
  };

  const session = {
    // variables
    address,
    authStatus,
    setAuthStatus,
    userTypedData,
    setUserTypedData,
    connector,

    // read
    isValid,

    // write
    start,
    stop,
  };

  return session;
};
