import styles from "../../styles/rewards.module.scss";
import Image from "next/image";
import {
  usePrepareContractWrite,
  useContractWrite,
  useAccount,
  useProvider,
} from "wagmi";
import { testabi } from "../../config/testabi";
import { rewardsabi } from "../../config/rewardsabi";
import { useContractRead } from "wagmi";
import { useEffect } from "react";
import { useState } from "react";
import { ethers } from "ethers";

/**
 *
 * @returns a component for claiming rewards based on staked NFTs
 * displays amount the user is making per claim
 * tells you what tokens have already been claimed
 * shows total
 *
 *
 */

const ClaimRewards = () => {
  const { address } = useAccount();
  const provider = useProvider();
  const [tokenIds, setTokenIds] = useState([]);
  const [eligibleTokens, setEligibleTokens] = useState([]);
  const [unique, setUnique] = useState([]);
  const [error, setError] = useState(null);

  let myContract = new ethers.Contract(
    "0x4F4c1A5A493b91D1F79A0c82e31e5e11850D3aA2",
    rewardsabi,
    provider
  );

  // check if all tokens in tokenIds are claimed already
  // if token is claimed, remove from eligible tokens array
  // take eligible tokens.length and pass to total pay to inform user
  // if all tokens in wallet are already claimed, user cannot claim again
  // pop-up modal

  // map over tokenIds and check if token is T/F
  const bulkCheck = async () => {
    const promises = tokenIds.map(token => {
      return threeTry(() => {
        return myContract.tokens(parseInt(token));
      }, token);
    });
  
    await Promise.all(promises);
  };
  
  const threeTry = (callback, token) => {
    return new Promise(async (resolve, reject) => {
      let lastError;
      for(let i = 0; i < 1; ++i){
        try{
           const result = await callback();
           if (result === false) {
                console.log("Current Approved Token", token);
                unique.push(token);
              }
           resolve(result);
           return;
        }
        catch(err){
          lastError = err;
        }
      }
      reject(lastError);
    });
  };

  //   address: '0x4F4c1A5A493b91D1F79A0c82e31e5e11850D3aA2',
  //   abi: rewardsabi,
  //   functionName: 'tokens',
  //   args:[tokenIds.forEach((el) => parseInt(el))],
  //   onSuccess: (data) => {
  //     console.log("Approved Tokens!")
  //   },
  //   onError: (error) => {
  //     console.log(error)
  //   }
  // });
  // const { writeAsync: check } = useContractWrite(claimRewardsConfig);

  /**
   * @dev fetches token Info from user address
   */

  const { config: tokenFetchConfig, error: tokenFetchError } = useContractRead({
    address: "0x8661cD0C4A3fD3Dc6B31cD24B20368851749Df00",
    abi: testabi,
    functionName: "getOwnerTokens",
    args: [address && address],
    onSuccess: (data) => {
      setTokenIds(data.map((el) => el.toString()));
      console.log(
        "Founder owned tokens!",
        data.map((el) => el.toString())
      );
    },
  });
  const { write: fetchTokenIds } = useContractWrite(tokenFetchConfig);


  /**
   * @dev setup contract write for claimRewards
   */

  const { config: claimRewardsConfig, error: claimRewardsError } =
    usePrepareContractWrite({
      address: "0x4F4c1A5A493b91D1F79A0c82e31e5e11850D3aA2",
      abi: rewardsabi,
      functionName: "claimRewards",
      args: [tokenIds.map((el) => parseInt(el))],
      onSuccess: (data) => {
        console.log("Approved Tokens!");
      },
      onError: (error) => {
        console.log(error);
        setError("Claim Not Allowed at this time");
      },
    });
  const { writeAsync: claim } = useContractWrite(claimRewardsConfig);

  useEffect(() => {
    fetchTokenIds?.();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tokenIds.length > 0) bulkCheck();
        //eslint-disable-next-line
  }, [tokenIds]);

  useEffect(() => {
    console.log('Eligible', eligibleTokens)
    setUnique([...new Set(eligibleTokens)]);
  }, [eligibleTokens])

  const claimRewardsHandler = async () => {
    if (tokenIds.length < 1) {
      alert("You do not own any Cubex Cards");
      return;
    }
    if (unique.length < 1) {
      alert("All of your tokens have been claimed");
      return;
    }
    let totalPay = unique.length * 11;
    alert(`Your claim for the CubeX staking rewards is $${totalPay}`);
    console.log("User Token List", unique);

    
    try {
      await claim?.();
      if (error) alert(error);
    } catch (error) {
      console.log(error);
    }
  };

  const claimRewards = [
    {
      rewardImg: "",
      rewardName: "Staking Reward",
      rewardDescription: "Eth Drop Reward For Cubex Cards",
    },
  ];

  return (
    <div className={styles.container}>
      <main className={styles.rewards}>
        {claimRewards.map((claimreward, idx) => {
          return (
            <div className={styles.reward} key={claimreward.rewardName}>
              <div className={styles.rewardDetails}>
                <Image
                  src={claimreward.rewardImg}
                  height={92}
                  width={92}
                  alt={""}
                />
                <span>
                  <h6>{claimreward.rewardName}</h6>
                  <p>{claimreward.rewardDescription}</p>
                </span>
              </div>

              <button
                className={styles.amount}
                onClick={() => claimRewardsHandler()}
              >
                <Image
                  className={styles.icon}
                  src={"/Images/4Icon.png"}
                  height={22}
                  width={22}
                  alt={""}
                />
                <p>Claim</p>

              
              </button>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default ClaimRewards;
