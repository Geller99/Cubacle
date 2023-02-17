export const domain = {
    name: "Cubicle Dashboard Approval",
    version: "1",
    chainId: 1,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
  };
  
  export const types = {
    Message: [
      { name: "title", type: "string" },
      { name: "contents", type: "string" },
    ],
  };
  export const value = {
    title: "The Cubicle",
    contents:
      "Welcome to the Cubicle, this signature ensures our systems can verify ownership of Cubex NFTs for members who wish to participate in staking, voting and rewards activities",
  };