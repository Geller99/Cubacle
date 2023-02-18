import axios from "axios";
import React, { useState } from "react";

const BUCKET_URL = "https://cubacle.s3.us-east-2.amazonaws.com/";

const CreateRewardForm = ({
  selectedReward,
  setSelectedReward,
  setRewards,
}) => {
  const [reward, setReward] = useState(selectedReward);
  const [file, setFile] = useState(null);
  let [imageUrl, setImageUrl] = useState();

  const uploadFile = async () => {
    if (file) {
      let { data } = await axios.post("/api/image-upload", {
        name: file.name,
        type: file.type,
      });

      const url = data.data.data;

      let result = await axios.put(url, file, {
        headers: {
          "Content-type": file.type,
          "Access-Control-Allow-Origin": "*",
        },
      });

      console.log("This is the S3 data", result.config.url);
      setImageUrl(result.config.url);
      setFile(null);
    }
  };

  const handleFileUpload = (event) => {
    if (event.target.files.length) {
      setFile(event.target.files[0]);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const newReward = { ...reward };
    newReward[name] = value;
    setReward(newReward);
    console.log("Reward form data", reward);
  };

  const handleSubmitReward = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        headers: {},
        url: "http://localhost:3000/api/rewards-create",
        data: {
          title: reward && reward.title,
          detail: reward && reward.detail,
          imageStr: imageUrl && imageUrl,
          eligibilityCount: reward && reward.eligibilityCount,
        },
      });
      setRewards(null);
      setSelectedReward(null);
      alert("Successfully Created New Reward");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateReward = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/rewards-update",
        data: {
          title: selectedReward && selectedReward.title,
          updatedTitle: reward && reward.title,
          detail: reward && reward.detail,
          imageStr: imageUrl && imageUrl,
          eligibilityCount: reward && reward.eligibilityCount,
        },
      });
      setRewards(null);
      setSelectedReward(null);
      alert("Successfully Updated Reward");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={
          selectedReward.title ? handleUpdateReward : handleSubmitReward
        }
      >
        <input
          className="Form-Title"
          type={"text"}
          name={"title"}
          placeholder={"Enter Title..."}
          value={reward && reward.title}
          onChange={handleFormChange}
        />
        <input
          className="Form-Details"
          type={"text"}
          name={"detail"}
          placeholder={"Enter Details..."}
          value={reward && reward.detail}
          onChange={handleFormChange}
        />

        <input type="file" onChange={handleFileUpload} />
        <button type="button" onClick={uploadFile}>
          {" "}
          Upload Reward Image{" "}
        </button>

        <input
          className="Form-EligibilityCount"
          type={"number"}
          name={"eligibilityCount"}
          placeholder={"Enter Count..."}
          value={reward && reward.eligibilityCount}
          onChange={handleFormChange}
        />

        <button onClick={() => setSelectedReward(null)}> Close </button>
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default CreateRewardForm;
