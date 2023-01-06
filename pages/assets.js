import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import styles from "../styles/assets.module.scss";
import { Network, Alchemy } from "alchemy-sdk";
import { cubexAbi } from "../config/cubexNTFabi";
import axios from "axios";

const settings = {
  apiKey: "Nvjk-5BRH6VLoWqiFTVWzZPacNMGaHYC",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Assets = () => {
  const { address } = useAccount();
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenInfo, setTokenInfo] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [db, setdb] = useState([]);
  const contractAddy = "0x92C93fAfc20fE882a448f86e594d9667259c42C8";


  const updateListingData = () => {
    let res =
      tokenInfo &&
      tokenInfo.map((token) => {
        return {
          imageUri: `https://ipfs.io/ipfs/${token.rawMetadata.image.substr(7)}`,
          stakingCount: 0,
          assetName: token.rawMetadata.name,
          listingStatus: false,
        };
      });

    setFinalData(res);
  };

  const updateFinalData = () => {
    let res =
      finalData &&
      finalData.map((token) => {
        const matchers =
          db &&
          db.find(
            (item) => item.tokenId === parseInt(token.assetName.substr(7))
          );
        return matchers
          ? {
              imageUri: token.imageUri,
              stakingCount: matchers.numberOfDaysListed,
              assetName: token.assetName,
              listingStatus: matchers.listingStatus,
            }
          : token;
      });

    setFinalData(res);
  };

  const { config: tokenFetchConfig, error: tokenFetchError } = useContractRead({
    address: "0x92C93fAfc20fE882a448f86e594d9667259c42C8",
    abi: cubexAbi,
    functionName: "getOwnerTokens",
    args: [address && address],
    onSuccess: (data) => {
      setTokenIds(data.map((el) => el.toString()));
      console.log(
        "Founder owned tokens!",
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
      console.log("Data", response);
    } catch (error) {
      console.log(error);
    }
  };

  const checkListingStatus = () => {
    try {
      axios({
        method: "post",
        url: "/api/fetchTokenData",
        data: tokenIds && tokenIds,
      }).then((res) => {
        setdb(res.data.data.tokenData);
        console.log("status data", res.data.data.tokenData);
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

  useEffect(() => {
    updateListingData();
  }, [tokenInfo.length]);

  useEffect(() => {
    updateFinalData();
  }, [finalData.length]);

  return (
    <section className={styles.container}>
      <header></header>

      <main>
        <div className={styles.tab}>
          <p>Owned</p>
          <span>{tokenIds.length && tokenIds.length}</span>
        </div>

        <div className={styles.assets}>
          {finalData &&
            finalData.map((asset) => {
              return (
                <div className={styles.asset} key={asset.assetName}>
                  <Image
                    src={asset.imageUri}
                    alt={""}
                    height={"250px"}
                    width={"100px"}
                    priority
                  />

                  <div className={styles.assetTitle}>
                    <div>
                      <p className={styles.collectionName}>{asset.assetName}</p>
                      <span className={styles.assetState}>
                        {" "}
                        {asset.listingStatus == false
                          ? "unlisted"
                          : "listed"}{" "}
                      </span>
                    </div>

                    <p className={styles.assetDays}>
                      {" "}
                      Days not listed: {asset.stakingCount}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </section>
  );
};

export default Assets;
