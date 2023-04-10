import connectMongo from "../../config/connectMongo";
import TokenModel from "../../models/tokenSchema";
/*

  @dev this endpoint handles receiving custom search query data from the admin and returning records from the DB

  For example, retrieve the list of token Ids that have been unlisted for a target number of days...
  Retrieve list of owners for all tokens listed on opensea
*/

const fetchUserData = async (req, res) => {

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
  }

  console.log("working...", req.body)

  const {
    count,
    typedData,
    signature,
    fetchListedOwners,
    fetchUnlistedOwners,
  } = req.body;
  let result;

  try {
    connectMongo();
    /*
          - Logic to handle DB prompts based on the value of the count sent in
          - if fetchAllOwners = true, return all unlisted Owner data, else return all listed Owner data
      */
    if (count) {
      result = await TokenModel.find({ numberOfDaysListed: count }).then(
        (data) => {
          console.log("This is the available data for x", data)
          return data;
        }
      );
    } else if (fetchListedOwners === true) {
      result = await TokenModel.find({ listingStatus: true }).then((data) => {
        console.log("This is the available data for x", data)
        return data;
      });
    } else if (fetchUnlistedOwners === true) {
      result = await TokenModel.find({ listingStatus: false }).then((data) => {
        console.log("This is the available data for x", data)
        return data;
      });
    }

    res.status(201).json({
      status: "success",
      data: {
        tokenData: result,
      },
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(400).json({
        status: "failed",
        data: {
          user: "unable to fetch user data",
        },
      });
    }
};

export default fetchUserData;