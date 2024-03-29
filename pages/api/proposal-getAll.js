import connectMongo from "../../config/connectMongo";
import ProposalModel from "../../models/proposal-schema";


const getAllProposals = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }

  try {
    connectMongo();
    const data = await ProposalModel.find().then((data) => {
      return data;
    });

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to fetch Proposals",
      },
    });
  }
};

export default getAllProposals;