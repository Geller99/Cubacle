import connectMongo from "../../config/connectMongo";
import ProposalModel from "../../models/proposal-schema";

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

const createProposal = async (req, res, next) => {
  const { typedData, signature } = req.body;

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

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  connectMongo();

  const { title, detail, active, voters } = req.body;

  try {
    const newProposal = await ProposalModel.create({
      title: title,
      detail: detail,
      active: active,
      negativeVoteCount: 0,
      positiveVoteCount: 0,
      voters: voters,
    });

    res.status(201).json({
      status: "success",
      data: {
        proposal: newProposal,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to creae new proposal",
      },
    });
  }
};

export default createProposal;
