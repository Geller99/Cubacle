import axios from "axios";
import React, { useState } from "react";

/**
 * 
 * @dev is missing Image upload component
 * @returns 
 */

const CreateProposalForm = ({  selectedProposal, setSelectedProposal, setProposals }) => {
  const [proposal, setProposal] = useState(selectedProposal);
  const [active, setActive] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const newProposal = { ...proposal };
    newProposal[name] = value;
    setProposal(newProposal);
  };

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/proposal-create",
        data: {
          title: proposal && proposal.title,
          detail: proposal && proposal.detail,
          active: active,
        },
      });
      setProposals(null);
      setSelectedProposal(null);
      alert("Successfully Created New Proposal");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProposal = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/api/proposal-update",
        data: {
          title: selectedProposal && selectedProposal.title,
          updatedTitle: proposal && proposal.title,
          detail: proposal && proposal.detail,
          active: active ? active: false,
        },
      });
      setProposals(null);
      setSelectedProposal(null);
      alert("Successfully Updated Proposal");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={
          selectedProposal.title ? handleUpdateProposal : handleSubmitProposal
        }
      >
        <input
          className="Form-Title"
          type={"text"}
          name={"title"}
          placeholder={"Enter Title..."}
          value={proposal && proposal.title}
          onChange={handleFormChange}
        />
        <input
          className="Form-Details"
          type={"text"}
          name={"detail"}
          placeholder={"Enter Details..."}
          value={proposal && proposal.detail}
          onChange={handleFormChange}
        />
       
        <input
          className="Form-Active"
          type={"checkbox"}
          name={"active"}
          
          onChange={() => setActive((prev) => !prev)}
          value={proposal && proposal.active}
        />
        <button onClick={() => setSelectedProposal(null)}> Close </button>
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default CreateProposalForm;
