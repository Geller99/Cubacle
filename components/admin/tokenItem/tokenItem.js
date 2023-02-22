const TokenItem = ({
  tokenId,
  ownerAddress,
  listingStatus,
  numberOfDaysListed,
}) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>

      <p>{ownerAddress}</p>
      <p>{tokenId && tokenId}</p>
      <p>{numberOfDaysListed && numberOfDaysListed} </p>
      <p>  {listingStatus ? "Listed" : "Unlisted"} </p>

    </div>
  );
};

export default TokenItem;
