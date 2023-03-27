import connectMongo from '../../config/connectMongo';
import TokenModel from '../../models/tokenSchema';

/**
 * @dev 
 * 
 * Created this endpoint to fetch token data based on an incoming array of token ids
 * 
 * Query the database
 * 
 * And return their listed/unlisted status on the frontend
 */


const fetchTokenData = async (req, res) => {

    
    connectMongo();
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

  
    const tokenIds = req.body;
  
    try {
        const result = tokenIds.map((el) => {
            return TokenModel.findOne( { tokenId: parseInt(el) } )
        })
        
        const final = await Promise.all(result).then((data)=> {
            return data
        })

        console.log("Final Data", final);

      res.status(201).json({
        status: "success",
        data: {
          tokenData: final,
        },
      });

    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "failed",
        data: {
          user: "unable to fetch token data from database",
        },
      });
    }
  };
  
  export default fetchTokenData;