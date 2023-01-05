import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import styles from '../styles/assets.module.scss';
import { Network, Alchemy } from 'alchemy-sdk';
import { cubexAbi } from '../config/cubexNTFabi';
import axios from 'axios';
// import ipfsClient from 'ipfs-http-client';

// const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
/**
 *
 * @returns
 *
 * Grab balanceOf wallet
 * Grab tokenIds of wallet address -  tokenOfOwnerByIndex
 * Grab Token URI from contract
 * Parse metadata response to JSON
 * Display image on site
 */

const settings = {
  apiKey: 'Nvjk-5BRH6VLoWqiFTVWzZPacNMGaHYC',
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Assets = () => {
  const { address } = useAccount();
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenInfo, setTokenInfo] = useState(null);
  const [user, setUser] = useState(null);
  const contractAddy = '0x92C93fAfc20fE882a448f86e594d9667259c42C8';

  const { config: tokenFetchConfig, error: tokenFetchError } = useContractRead({
    address: '0x92C93fAfc20fE882a448f86e594d9667259c42C8',
    abi: cubexAbi,
    functionName: 'getOwnerTokens',
    args: [address && address],
    onSuccess: (data) => {
      setTokenIds(data.map((el) => el.toString()));
      console.log(
        'Founder owned tokens!',
        data.map((el) => el.toString())
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { write: fetchTokenIds } = useContractWrite(tokenFetchConfig);
  const fetchTokenData = async () => {
    const sortedTokens = tokenIds.map((el) => {
      return {
        contractAddress: contractAddy,
        tokenId: el,
      };
    });
    try {
      const response = await alchemy.nft.getNftMetadataBatch(sortedTokens);
      setTokenInfo(response);
      console.log('Data', response);
    } catch (error) {
      console.log(error);
    }
  };

  const checkListingStatus = () => {
    try {
      axios({
        method: 'post',
        url: '/api/fetchTokenData',
        data: tokenIds && tokenIds,
      }).then((res) => {
        // process the response
        console.log('status data', res);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTokenIds?.();
  }, []);

  useEffect(() => {
    if (tokenIds.length > 0) {
      fetchTokenData();
      checkListingStatus();
    }
  }, [tokenIds.length]);

  return (
    <section className={styles.container}>
      <header></header>

      <main>
        <div className={styles.tab}>
          <p>Owned</p>
          <span>32</span>
        </div>

         {/* <div className={styles.assets}>
          {tokenInfo &&
            tokenInfo.map((asset) => {
              return (
                <div className={styles.asset} key={asset.rawMetadata.name}>
                  <Image
                    src={`https://ipfs.io/ipfs/${asset.rawMetadata.image.substr(7)}`}
                    alt={''}
                    height={'250px'}
                    width={'100px'}
                    priority
                  />

                  <div className={styles.assetTitle}>
                    <div>
                      <p className={styles.collectionName}>
                        {asset.rawMetadata.name}
                      </p>
                      <span className={styles.assetState}>Unlisted</span>
                    </div>

                    <p className={styles.assetDays}> Days not listed: 3 </p>
                  </div>
                </div>
              );
            })}
        </div>  */}

        <div className={styles.assets}>
          <div className={styles.asset}>
            <img src={'/Images/userImg.jpg'} alt="" />

            <div className={styles.assetTitle}>
              <div>
                <p className={styles.collectionName}> Cubex #11120</p>

                <span className={styles.assetState}>Unstacked</span>
              </div>

              <p className={styles.assetDays}> Days not listed: 3 </p>
            </div>
          </div>


          
          </div>

      </main>
    </section>
  );
};

export default Assets;

/**
 * @dev created this page to display a list of all NFTs in User's wallet along with a counter indicating staking period
 *
 * This page/component also serves to monitor transfer events on the NFT contract and update the DB accordingly
 *
 *
 */
