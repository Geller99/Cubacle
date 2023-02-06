import React from "react";
import axios from "axios";

const ProposalItem = ({
  title,
  detail,
  active,
  positiveVoteCount,
  negativeVoteCount,
  setSelectedProposal,
  proposal,
  setProposals,
}) => {

  const handleDeleteProposal = async () => {
    console.log("Deleting...")
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/proposal-delete",
        data: {
          title: proposal.title,
        },
      });
      setProposals(null);
      alert("Successfully Deleted");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "row", color: "red" }}>
      <p> {title && title} </p>
      {/* <p> {detail && detail} </p> */}
      {/* <p> {image && image} </p> */}
      {/* <p> {eligibilityCount} </p> */}
      {/* <p> status {active && active} </p>
        <p> +votes {positiveVoteCount && positiveVoteCount} </p>
        <p> +votes {negativeVoteCount && negativeVoteCount} </p> */}
      <button onClick={() => setSelectedProposal(proposal)}> edit</button>
      <button onClick={() => handleDeleteProposal()}> delete </button>
    </div>
  );
};

export default ProposalItem;
