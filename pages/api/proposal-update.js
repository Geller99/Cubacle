import ProposalModel from "../../models/proposal-schema";
import connectMongo from "../../config/connectMongo";
const {
  recoverTypedSignature,
  SignTypedDataVersion,
} = require("@metamask/eth-sig-util");

const adminAddress = [
  "0xa33a70FABFeb361Fe891C208B1c27ec0b64baBEB",
  "0x5013983D5691886140f24Abd66d2D7072f62991b",
  "0x575dC6dd8c838F8E015349BbF55b90E718efF537",
  "0xb265d9496Ae60CABe0ea1D3eab059B8Bb1911428",
  "0x282D35Ee1b589F003db896b988fc59e2665Fa6a1",
];

const updateProposal = async (req, res) => {

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { title, detail, updatedTitle, active, typedData, signature } =
    req.body;

  const signer = recoverTypedSignature({
      data: typedData,
      signature: signature,
      version: SignTypedDataVersion.V4,
    });
  
    if (
      !adminAddress
        .map((address) => address.toLowerCase())
        .includes(signer.toLowerCase())
    ) {
      res.status(405).send({ message: "Only Admin" });
    }
  

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
