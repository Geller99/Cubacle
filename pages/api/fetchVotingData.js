/*

  This endpoint exists to return results of voting counts to the admin based on request
  - Admin can retrieve positive voting counts, negative voting counts and ALL voting counts
  - Admin can retrieve wallets of all voters and see how many tokens they hold
  - Admin can view list of active voters progressively

  Wulug.zulipchat.org

*/

import connectMongo from "../../config/connectMongo";
import ProposalModel from "../../models/proposal-schema";
/*

  @dev this endpoint handles receiving custom search query data from the admin and returning records from the DB

  For example, retrieve the list of token Ids that have been unlisted for a target number of days...
  Retrieve list of owners for all tokens listed on opensea
*/

const fetchVotingData = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
  }

  console.log("working...", req.body);

  const { title, account, typedData, signature } = req.body;
  let result;

  try {
    connectMongo();
    /*
          - Logic to handle DB prompts based on the value of the count sent in
          - if fetchAllOwners = true, return all unlisted Owner data, else return all listed Owner data
    */
   result = await ProposalModel.findOne({title: title}).then((data) => data);

    res.status(201).json({
      status: "success",
      data: {
        proposalData: result,
      },
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to fetch Proposal data",
      },
    });
  }
};

export default fetchVotingData;
