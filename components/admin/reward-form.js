import axios from "axios";

const CreateRewardForm = ({
  selectedReward,
  setSelectedReward,
  reward,
  setReward,
  handleFormChange,
}) => {
  const handleSubmitReward = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/rewards-create",
        data: {
          title: reward && reward.title,
          detail: reward && reward.detail,
          imageStr: "",
          eligibilityCount: reward && reward.eligibilityCount,
        },
      });
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
          title: reward && reward.title,
          detail: reward && reward.detail,
          imageStr: "",
          eligibilityCount: reward && reward.eligibilityCount,
        },
      });
      alert("Successfully Updated Reward");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={selectedReward ? handleSubmitReward : handleUpdateReward }>
        <input
          className="Form-Title"
          type={"text"}
          name={"title"}
          placeholder={"Enter Title..."}
          value={selectedReward && selectedReward.title}
          onChange={handleFormChange}
        />
        <input
          className="Form-Details"
          type={"text"}
          name={"detail"}
          placeholder={"Enter Details..."}
          value={selectedReward && selectedReward.detail}
          onChange={handleFormChange}
        />
        {/* <img src="#" alt=""> Upload Icon </img> */}
        <input
          className="Form-EligibilityCount"
          type={"number"}
          name={"eligibilityCount"}
          placeholder={"Enter Count..."}
          value={selectedReward && selectedReward.eligibilityCount}
          onChange={handleFormChange}
        />
        <button onClick={() => setSelectedReward(null)}> Close </button>

        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default CreateRewardForm;
