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
  const [tokenIds, setTokenIds] = useState(null);
  const [finalData, setFinalData] = useState(null);
  const contractAddy = "0x92C93fAfc20fE882a448f86e594d9667259c42C8";

  const defaultData = new Array(6).fill({
    imageUri: "",
    stakingCount: 0,
    assetName: "Loading...",
    listingStatus: false,
  });

  // step 4: combine db and finalData
  const updateFinalData = (tokenInfos, dbData) => {
    const infoMap = tokenInfos.reduce((combined, info) => {
      const tokenId = parseInt(info.assetName.substr(7));
      combined[tokenId] = info;
      return combined;
    }, {});

    dbData.forEach((dbItem) => {
      const info = infoMap[dbItem.tokenId];
      if (info) {
        console.log(`updating token ${dbItem.tokenId}`);
        infoMap[dbItem.tokenId] = {
          ...info,
          stakingCount: dbItem.numberOfDaysListed,
          listingStatus: dbItem.listingStatus,
        };
      }
    });

    setFinalData(Object.values(infoMap));
  };

  // step 1
  useContractRead(
    {
      address: "0x92C93fAfc20fE882a448f86e594d9667259c42C8",
      abi: cubexAbi,
      functionName: "getOwnerTokens",
      args: [address],
      onSuccess: (data) => {
        console.log("step 1: getOwnerTokens", { address, data });
        const tokenIds = data.map((el) => el.toString());
        setTokenIds(tokenIds);
        console.log("Founder owned tokens!", tokenIds);
      },
      onError: (error) => {
        console.log("step 1b", error);
      },
    },
    [address]
  );

  // step 3a
  // const fetchTokenData = async (fetchTokenIds) => {
  //   console.log("step 3a", fetchTokenIds);

  //   const sortedTokens = fetchTokenIds.map((el) => {
  //     return {
  //       contractAddress: contractAddy,
  //       tokenId: el,
  //     };
  //   });
  //   try {
  //     const response = await alchemy.nft.getNftMetadataBatch(sortedTokens);
  //     console.log("Data", response);
  //     //setTokenInfo(response);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return [];
  //   }
  // };

  const fetchTokenData = async (fetchTokenIds) => {
    console.log("step 3a", fetchTokenIds);
    
    const batchSize = 50; // set the batch size to 50
    
    const batches = [];
    for (let i = 0; i < fetchTokenIds.length; i += batchSize) {
      batches.push(fetchTokenIds.slice(i, i + batchSize));
    }
    
    const responses = [];
    
    for (const batch of batches) {
      const sortedTokens = batch.map((el) => {
        return {
          contractAddress: contractAddy,
          tokenId: el,
        };
      });
      
      try {
        const response = await alchemy.nft.getNftMetadataBatch(sortedTokens);
        console.log("Data", response);
        responses.push(response);
      } catch (error) {
        console.log(error);
        responses.push([]);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second before making the next batch request
    }
    
    return responses.flat(); // flatten the array of responses
  };

  // step 3b
  const fetchDbData = async (checkTokenIds) => {
    try {
      console.log("step 3b", checkTokenIds);
      const res = await axios({
        method: "post",
        url: "/api/fetchTokenData",
        data: checkTokenIds,
      });

      console.log("status data", res.data.data.tokenData);
      return res.data.data.tokenData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  // step 3c
  const mapTokenData = (updateTokenInfos) => {
    return updateTokenInfos.map((token) => ({
      imageUri: `https://ipfs.io/ipfs/${token.rawMetadata.image.substr(7)}`,
      stakingCount: 0,
      assetName: token.rawMetadata.name,
      listingStatus: false,
    }));
  };

  // step 2
  const loadTokenData = async (loadTokenIds) => {
    const [tokenInfos, dbData] = await Promise.all([
      fetchTokenData(loadTokenIds).then(mapTokenData),
      fetchDbData(loadTokenIds),
    ]);

    if (tokenInfos.length && dbData.length) {
      updateFinalData(tokenInfos, dbData);
    } else {
      setFinalData(tokenInfos);
    }
  };

  // step 2 trigger
  useEffect(() => {
    if (tokenIds?.length) {
      console.log("step 2", { tokenIds });
      loadTokenData(tokenIds);
    }
  }, [tokenIds]);

  const render = (data) => {
    return (
      <section className={styles.container}>
        <header></header>

        <main>
          <div className={styles.tab}>
            <p>Owned</p>
            <span>{tokenIds?.length || 0}</span>
          </div>

          <div className={styles.assets}>
            {data &&
              data.map((asset) => {
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
                        <p className={styles.collectionName}>
                          {asset.assetName}
                        </p>
                        <span className={styles.assetState}>
                          {" "}
                          {asset.listingStatus === false
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

  return render(finalData);
};

export default Assets;
