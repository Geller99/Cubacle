
import connectMongo from "../../config/connectMongo";
import RewardsModel from "../../models/rewards-schema";

// const adminAddress = ["0xa33a70FABFeb361Fe891C208B1c27ec0b64baBEB"];

const createReward = async (req, res) => {

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  connectMongo();
  
  const { title, detail, imageStr, eligibilityCount, typedData, signature } =
    req.body;

  try {

    // const signer = recoverTypedSignature({
    //   data: typedData,
    //   signature: signature,
    //   version: SignTypedDataVersion.V4,
    // });

    // if (signer.toLowerCase() === adminAddress.map((el) => el.toLowerCase())) {
    //     console.log("Creating Proposal...")
    // } else {
    //   res
    //   .status(405)
    //   .send({ message: "This account is not allowed to initiate proposals" });
    // }

    const newReward = await RewardsModel.create({
      title: title,
      detail: detail,
      image: imageStr,
      eligibilityCount: eligibilityCount
    }).then((data) => {
        return data;
    });

    res.status(201).json({
      status: "success",
      data: {
        proposal: newReward,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to create new reward",
      },
    });
  }
};

export default createReward;