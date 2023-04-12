import connectMongo  from "../../config/connectMongo";
import RewardModel from "../../models/rewards-schema";


const getAllRewards = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }


  // const { typedData, signature } = req.body;

  // const signer = recoverTypedSignature({
  //   data: typedData,
  //   signature: signature,
  //   version: SignTypedDataVersion.V4,
  // });

  // let authStatus;
  // if (
  //   adminAddress
  //     .map((address) => address.toLowerCase())
  //     .includes(signer.toLowerCase())
  // ) {
  //   authStatus = "Admin";
  // } else {
  //   authStatus = "User";
  //   console.log("Valid Signer", signer.toLowerCase());
  // }


  try {
    connectMongo();
    const data = await RewardModel.find().then((data) => {
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
        user: "unable to fetch Rewards",
      },
    });
  }
};

export default getAllRewards;
