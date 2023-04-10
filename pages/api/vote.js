import { connectMongo } from "../../config/connectMongo";
import mongoose from "mongoose";
import ProposalModel from "../../models/proposal-schema";
const {
  recoverTypedSignature,
  SignTypedDataVersion,
} = require("@metamask/eth-sig-util");

/**
 * @dev gets vote data from frontend, grabs proposal ID, increments vote count on that particular proposal
 *
 */

const voteOnProposal = async (req, res) => {
  try {
    const {
      title,
      negativeVoteCount,
      positiveVoteCount,
      account,
      typedData,
      signature,
    } = req.body;

    console.info({
      typedData,
      "typedData.types.Message": typedData.types.Message,
      signature,
    });

    const signer = recoverTypedSignature({
      data: typedData,
      signature: signature,
      version: SignTypedDataVersion.V4,
    });

    console.log({ signer });
    if (signer.toLowerCase() !== account.toLowerCase()) {
      res.status(500).send({
        status: "failed",
        message: "Invalid Signature",
      });
      return;
    } else {
      console.log("Valid Signer");
    }

    connectMongo();
    const proposal = await ProposalModel.findOne({ title: title });

    if (proposal.voters.includes(account.toLowerCase())) {
      res.status(409).send({
        status: "failed",
        message: "already voted",
      });
      return;
    }

    const data = await ProposalModel.updateOne(
      { title: title },
      {
        $inc: {
          negativeVoteCount: negativeVoteCount,
          positiveVoteCount: positiveVoteCount,
        },

        $push: {
          voters: account.toLowerCase(),
        },
      }
    );
    res.status(200).json({
      status: "Success",
      data: data,
    });
  } catch (err) {
    console.warn({ err });
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to register vote",
      },
    });
  }
};

export default voteOnProposal;
