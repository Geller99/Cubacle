import connectMongo from "../../config/connectMongo";
import RewardsModel from "../../models/rewards-schema";

const deleteReward = async (req, res) => {
  const { title, typedData, signature } = req.body;

  try {
    connectMongo();
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

    const newReward = await RewardsModel.findOneAndDelete({
      title: title,
    }).then((data) => {
      console.log("Updated DB", data);
      return data;
    });

    res.status(201).json({
      status: "success",
      data: {
        proposal: newReward,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to delete target reward",
      },
    });
  }
};

export default deleteReward;
