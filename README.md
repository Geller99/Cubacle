

## Cubase Dashboard


- OnLoad, User is prompted to Login, sign EIP
- User has access to dashboard, rewards and soft staking


## DB Access

- Individual Token Data is stored in DB based on Ids
- Token data is updated via a scheduler API based on transfer events and listing events on Opensea
- If a token is listed, the daily counter resets to zero
- If a token is transferred, the daily counter also resets
- Admin can pull token data based on counter and owner


## Admin Privileges

- Admin can pull token data based on conditions
- Admin can pull info on individual tokens or token groups
- Admin can create rewards and store in DB with durations
- Admin can administer rewards based on user metrics
- Admin can operate Master Contract for faucets, eth, NFT drops




## User Privileges

- User can claim rewards off contract
- User can see how long their tokens have been staked or NOT


// create an array of tokenIds.length number of objects

// for each one... update the image string with data from alchemy

// for each one... update other attributes with data from DB

// map over array...