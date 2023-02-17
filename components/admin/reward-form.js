import axios from "axios";
import React, { useState } from "react";
import { useS3Upload } from "next-s3-upload";

const CreateRewardForm = ({
  selectedReward,
  setSelectedReward,
  setRewards,
}) => {
  const [reward, setReward] = useState(selectedReward);
  const [file, setFile] = useState(null);
  let [imageUrl, setImageUrl] = useState();
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleFileUpload = (event) => {
    if (event.target.files.length) {
      setFile(event.target.files[0]);
      console.log("This is the uploaded file", file);
    }
  };

  // let handleFileChange = async file => {
  //   let { url } = await uploadToS3(file);
  //   setImageUrl(url);
  // };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const newReward = { ...reward };
    newReward[name] = value;
    setReward(newReward);
  };

  const handleSubmitReward = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        headers: {
          "content-type": "multipart/form-data",
        },
        url: "http://localhost:3000/api/rewards-create",
        data: {
          title: reward && reward.title,
          detail: reward && reward.detail,
          imageStr: file && file,
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
          imageStr: file && file,
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
        <input
          className="Form-EligibilityCount"
          type={"number"}
          name={"eligibilityCount"}
          placeholder={"Enter Count..."}
          value={reward && reward.eligibilityCount}
          onChange={handleFormChange}
        />
        <button onClick={() => setSelectedReward(null)}> Close </button>
          {console.log(imageUrl)}
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default CreateRewardForm;
