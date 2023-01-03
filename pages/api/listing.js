const sdk = require("api")("@opensea/v2.0#15cxad3jlan2id1f");
/**
 *
 * @dev Created this endpoint to actively track token data via the Opensea Listing API
 *
 * This endpoint calls a function on a scheduler
 *
 * Hits the opensea api and returns info on all listed Cubex NFT tokens
 *
 * If token is listed, reset the count in db
 *
 * If token is NOT listed, update the count daily
 *
 */

const getListing = async (req, res) => {
  /**
   * from 1 - 10,000
   * Loop over, add the next 25 values to array
   *
   * Pass array to api as params
   */
    
  const { tokenIdList } = req.body;
  
  const url = 'https://api.opensea.io/v2/orders/ethereum/seaport/listings?asset_contract_address=0x92C93fAfc20fE882a448f86e594d9667259c42C8&token_ids=444%2C%20324&order_by=created_date&order_direction=desc';
 
  try {
    return await axios.get(url)
    .then(response => {
        if (response) {
          console.log("Sample API data",response)
        }
      })
      .catch(error => {
        console.log(error)
      })

      /**
       * if tokenId data exists...then token is listed (response.data.orders) then reset staking status to zero
       */

  } catch (error) {
    console.error(error)
  }
  
};
