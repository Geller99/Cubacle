const TokenItem = ({
  tokenId,
  ownerAddress,
  listingStatus,
  numberOfDaysListed,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p>TokenId : {tokenId && tokenId}</p>
      <p>Owner: {ownerAddress}</p>
      <p> Status : {listingStatus ? "Listed" : "Unlisted"} </p>
      <p> Staking Counter: {numberOfDaysListed && numberOfDaysListed} </p>
    </div>
  );
};

export default TokenItem;
