import RewardModel from "../../models/rewards-schema";
import connectMongo from "../../config/connectMongo";

const updateReward = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const {
    title,
    detail,
    imageStr,
    updatedTitle,
    eligibilityCount,
    typedData,
    signature,
  } = req.body;

  let updatedReward;
  console.log("Request Body", req.body);

  try {
    connectMongo();

    if (detail && !updatedTitle && !imageStr) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { detail: detail },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (detail && imageStr && !updatedTitle) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { detail: detail, image: imageStr },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (detail && updatedTitle && !imageStr) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { detail: detail, title: updatedTitle },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (updatedTitle && imageStr && !detail) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { title: updatedTitle, image: imageStr },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (updatedTitle && !imageStr && !detail) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { title: updatedTitle },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (imageStr && !updatedTitle && !detail) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { image: imageStr },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (updatedTitle && imageStr && detail) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { title: updatedTitle, detail: detail, image: imageStr },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (eligibilityCount && !updatedTitle && !imageStr && !detail) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { eligibilityCount: eligibilityCount },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (eligibilityCount && updatedTitle && !imageStr && !detail) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { title: updatedTitle, eligibilityCount: eligibilityCount },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (eligibilityCount && updatedTitle && imageStr && !detail) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: {
            title: updatedTitle,
            image: imageStr,
            eligibilityCount: eligibilityCount,
          },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (eligibilityCount && !updatedTitle && imageStr && !detail) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { image: imageStr, eligibilityCount: eligibilityCount },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (eligibilityCount && !updatedTitle && !imageStr && detail) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: { detail: detail, eligibilityCount: eligibilityCount },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    } else if (eligibilityCount && updatedTitle && imageStr && detail) {
      updatedReward = await RewardModel.findOneAndUpdate(
        { title: title },
        {
          $set: {
            title: updatedTitle,
            detail: detail,
            image: imageStr,
            eligibilityCount: eligibilityCount,
          },
        }
      ).then((data) => {
        console.log("Updated Reward", data);
        return data;
      });
    }

    res.status(201).json({
      status: "success",
      data: {
        reward: updatedReward,
      },
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(400).json({
      status: "failed",
      data: {
        user: "unable to update target reward",
      },
    });
  }
};

export default updateReward;
