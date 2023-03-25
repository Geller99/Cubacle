import connectMongo from "../../config/connectMongo";
import ProposalModel from "../../models/proposal-schema";

const deleteProposal = async (req, res) => {
  const { title, typedData, signature } = req.body;

  try {
    connectMongo();

   

    const newProposal = await ProposalModel.findOneAndDelete({
      title: title,
    }).then((data) => {
      console.log("Updated DB", data);
    });

    res.status(201).json({
      status: "success",
      data: {
        proposal: newProposal,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to delete target proposal",
      },
    });
  }
};

export default deleteProposal;
