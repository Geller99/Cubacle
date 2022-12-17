import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

/**
 *
 * @returns user wallet connect for the dashboard
 *
 *
 */

const Profile = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const [activeUser, setActiveUser] = useState();

  const submit = () => {
    return (
      <div className="Profile">
        <ConnectButton />

        {/* Connected to  {activeUser && activeUser}  */}
        {/* <button onClick={() => disconnect()}>Disconnect</button> */}
      </div>
    );
  };

  useEffect(() => {
    setActiveUser(address);
  }, [address]);
  return submit();
};

export default Profile;
