import ProposalModel from "../../models/proposal-schema";
import connectMongo from "../../config/connectMongo";


const updateProposal = async (req, res) => {

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { title, detail, updatedTitle, active, typedData, signature } =
    req.body;

  let updatedProposal;
  console.log("Request Body", req.body);

  try {
    connectMongo();

    if (detail && !active && !updatedTitle) {
      updatedProposal = await ProposalModel.findOneAndUpdate(
        { title: title },
        {
          $set: { detail: detail },
        }
      ).then((data) => {
        console.log("Updated Proposal", data);
        return data;
      });
    } else if (active && detail && !updatedTitle) {
      updatedProposal = await ProposalModel.findOneAndUpdate(
        { title: title },
        {
          $set: { detail:detail, active: active },
        }
      ).then((data) => {
        console.log("Updated Proposal", data);
        return data;
      });
    } else if (detail && !active && updatedTitle) {
      updatedProposal = await ProposalModel.findOneAndUpdate(
        { title: title },
        {
          $set: { title: updatedTitle, detail: detail },
        }
      ).then((data) => {
        console.log("Updated Proposal", data);
        return data;
      });
    } else if (!updatedTitle && !detail && active) {
      updatedProposal = await ProposalModel.findOneAndUpdate(
        { title: title },
        {
          $set: { active: active },
        }
      ).then((data) => {
        console.log("Updated Proposal", data);
        return data;
      });
    } else if (updatedTitle && !detail && active) {
      updatedProposal = await ProposalModel.findOneAndUpdate(
        { title: title },
        {
          $set: { title: updatedTitle, active: active },
        }
      ).then((data) => {
        console.log("Updated Proposal", data);
        return data;
      });
    } else if (updatedTitle && !detail && !active) {
      updatedProposal = await ProposalModel.findOneAndUpdate(
        { title: title },
        {
          $set: { title: updatedTitle },
        }
      ).then((data) => {
        console.log("Updated Proposal", data);
        return data;
      });
    } else if (updatedTitle && detail && active) {
      updatedProposal = await ProposalModel.findOneAndUpdate(
        { title: title },
        {
          $set: { title: updatedTitle , detail: detail, active: active },
        }
      ).then((data) => {
        console.log("Updated Proposal", data);
        return data;
      });
    } 

    res.status(201).json({
      status: "success",
      data: {
        proposal: updatedProposal,
      },
    });
  } catch (error) {
    console.log("Server Error", error)
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to update target proposal",
      },
    });
  }
};

export default updateProposal;
