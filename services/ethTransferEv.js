import React from 'react'
import ethers from 'ethers'
import { abi } from '../config/abi';

const network = {
    name: "mainnet",
    chainId: 1337,
    ensAddress: customEnsAddress
}
const provider = 0;
const contract = new ethers.Contract( 0x9a5c845ad4c8741376d5F5E1Ff41cd4Ee2Aa291B , abi , signerOrProvider );


export const EthTransferEv = async () => {

    const account = "0xa33a70FABFeb361Fe891C208B1c27ec0b64baBEB";
    let xferFrom = await contract.filters.Transfer(account);
    let xferTo = await contract.filters.Transfer(null, account);

    const transfers = [
        ...xferFrom,
        ...xferTo
      ];
    
    transfers.sort(( left, right ) => {
    if(left.blockNumber < right.blockNumber)
      return -1;

    if(left.blockNumber > right.blockNumber)
      return 1;

    if(left.logIndex < right.logIndex)
      return -1;

    if(left.logIndex > right.logIndex)
      return 1;

    return 0;
  });

  console.log(transfers);

//idk how ethers pads
//   const tokens = {};
//   const paddedAccount = Web3.utils.padLeft(account, 64);
//   transfers.forEach(xfer => {
//     const tokenId = parseInt( BigInt(xfer.topics[3]).toString() );
//     if(xfer.topics[2].toLowerCase() === paddedAccount.toLowerCase()){
//       tokens[tokenId] = true;
//     }
//     else{
//       delete tokens[tokenId];
//     }
//   });

}