import connectMongo from "../../config/connectMongo";
import RewardsModel from "../../models/rewards-schema";
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

const createReward = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  connectMongo();

  const { title, detail, imageStr, eligibilityCount, typedData, signature } =
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

  try {

  
    const newReward = await RewardsModel.create({
      title: title,
      detail: detail,
      image: imageStr,
      eligibilityCount: eligibilityCount,
    }).then((data) => {
      return data;
    });

    res.status(201).json({
      status: "success",
      data: {
        reward: newReward,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      data: {
        reward: "unable to create new reward",
      },
    });
  }
};

export default createReward;
