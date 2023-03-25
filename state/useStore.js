import {useState} from 'react';
import {useAccount, useDisconnect} from 'wagmi';

import axios from 'axios';

const {
  recoverTypedSignature,
  SignTypedDataVersion,
} = require("@metamask/eth-sig-util");


// 60 seconds * 60 minutes = 3600 = 1 hour
const SESSION_LIFETIME = 120; //3600;

export const useStore = () => {
  // public
  const { address, connector } = useAccount();
  //const { disconnect } = useDisconnect();

  // private
  const [authStatus, setAuthStatus] = useState(null);
  const [sessionState, setSessionState] = useState();


  // public
  const isValid = async () => {
    if(!address)
      return false;


    // check state first
    const stateSession = getStateSession();
    const storageSession = getStorageSession();
    if(isValidSession(stateSession)){
      console.debug("stateSession is valid");

      if(!authStatus){
        const response = await fetchAuthStatus(stateSession);
        if(response?.data?.status === "success"){
          console.debug("update storageSession with stateSession (1)");
          localStorage.setItem(address.toLowerCase(), JSON.stringify(stateSession));

          console.debug("setAuthStatus (1)");
          setAuthStatus(response.data.data.authStatus);
        }
      }
      else if(!isMatch(stateSession, storageSession)){
        console.debug("update storageSession with stateSession (2)");
        localStorage.setItem(address.toLowerCase(), JSON.stringify(stateSession));
      }

      return true;
    }
    else{
      console.debug("stateSession is NOT valid", stateSession);
    }

    // check localStorage last
    if(isValidSession(storageSession)){
      console.debug("storageSession is valid");

      // always revalidate cold storage
      const response = await fetchAuthStatus(storageSession);
      if(response?.data?.status === "success"){
        console.debug("setAuthStatus (2)");
        setAuthStatus(response.data.data.authStatus);

        console.debug("setSessionState");
        setSessionState(storageSession);
        return true;
      }
    }

    console.debug("storageSession is NOT valid", storageSession);

    // nothing valid, cleanup
    await stop();

    return false;
  };

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

  const start = async () => {
    console.debug('start');
    if(!address || !connector)
      return false;


    const typedData = createTypedData();
    const signature = await requestSignature(typedData);
    const session = {
      typedData,
      signature
    };


    const response = await fetchAuthStatus(session);
    console.debug(response);
    if(response?.data?.status === "success"){
      localStorage.setItem(address.toLowerCase(), JSON.stringify(session));
      setAuthStatus(response.data.data.authStatus);
      setSessionState(session);
      return true;
    }

    return false;
  };

  const stop = async (triggerDisconnect) => {
    console.debug("stop");
    if(address)
      localStorage.removeItem(address.toLowerCase());

    setAuthStatus(null);
    setSessionState(null);

    if(triggerDisconnect){
      //disconnect();
    }
  };



  // private
  const fetchAuthStatus = async (session) => {
    try{
      const response = await axios({
        method: "post",
        url: "/api/auth",
        headers: {},
        data: session,
      });

      console.log("User Status Response", response);
      return response;
    }
    catch(err){
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
    try{
      const sessionJSON = localStorage.getItem(address.toLowerCase());
      return JSON.parse(sessionJSON);
    }
    catch(err){
      console.warn({ err });
    }

    return null;
  };

  const getTimestamp = () => {
    return Math.round(Date.now() / 1000);
  };

  const isActiveSession = (session) => {
    try{
      const created = session.typedData.message.timestamp;
      const expires = created + SESSION_LIFETIME;
      const datetime = new Date(expires * 1000);
      console.debug(`Session expires at ${datetime.toISOString()}`);

      return expires > getTimestamp();
    }
    catch(err){
      console.error({ err });
    }

    return false;
  };

  const isMatch = (sessionA, sessionB) => {
    try{
      if(sessionA.signature !== sessionB.signature)
        return false;

      const messageA = sessionA.typedData;
      const messageB = sessionB.typedData;
      if(messageA.account !== messageB.account)
        return false;

      if(messageA.timestamp !== messageB.timestamp)
        return false;

      // check title / contents?

      return true;
    }
    catch(err){
      console.warn({ err });
    }

    return false;
  };

  // abstraction
  const isValidSession = (session) => {
    return isActiveSession(session) && isValidSignature(session);
  };

  const isValidSignature = (session) => {
    try{
      if(!address)
        return false;

      const account = session.typedData.message.account;
      if(!account)
        return false;

      if(address.toLowerCase() !== account.toLowerCase())
        return false;

      const signer = recoverTypedSignature({
        data:      session.typedData,
        signature: session.signature,
        version:   SignTypedDataVersion.V4,
      });
      if (!signer)
        return false;

      return address.toLowerCase() === signer.toLowerCase();
    }
    catch(err){
      console.warn({ err });
    }

    return false;
  };

  const session = {
    // variables
    address,
    authStatus,
    connector,

    // read
    isValid,

    // write
    start,
    stop
  };

  //return { user, setUser, signer, setSigner };
  return session;
}
