import axios from 'axios';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/admin.module.scss';
/**
 *
 * @dev is missing Image upload component
 * @returns
 */

const CreateProposalForm = ({
  selectedProposal,
  setSelectedProposal,
  setProposals,
}) => {
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
        method: 'post',
        url: 'http://localhost:3000/api/proposal-create',
        data: {
          title: proposal && proposal.title,
          detail: proposal && proposal.detail,
          active: active,
        },
      });
      setProposals(null);
      setSelectedProposal(null);
      alert('Successfully Created New Proposal');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProposal = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: 'post',
        url: 'http://localhost:3000/api/proposal-update',
        data: {
          title: selectedProposal && selectedProposal.title,
          updatedTitle: proposal && proposal.title,
          detail: proposal && proposal.detail,
          active: active ? active : false,
        },
      });
      setProposals(null);
      setSelectedProposal(null);
      alert('Successfully Updated Proposal');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.proposalFormModal}>
      <form
        onSubmit={
          selectedProposal.title ? handleUpdateProposal : handleSubmitProposal
        }
      >
        <header>
          <h4>Create New Proposal</h4>
          <p>Fill the form below to create new proposal</p>
          <button onClick={() => setSelectedProposal(null)}>
            <Image
              className={styles.icon}
              src={'/Images/closeIcon2.svg'}
              height={24}
              width={24}
              alt={''}
            />{' '}
          </button>
        </header>
        <span>
          <label htmlFor="proposal-title">Proposal Title</label>
          <input
            className="Form-Title"
            type={'text'}
            name={'title'}
            placeholder={'Enter Title...'}
            value={proposal && proposal.title}
            onChange={handleFormChange}
          />
        </span>

        <span>
          <label htmlFor="proposal-details">Proposal Details</label>
          <input
            className="Form-Details"
            type={'text'}
            name={'detail'}
            placeholder={'Enter Details...'}
            value={proposal && proposal.detail}
            onChange={handleFormChange}
          />
        </span>

        <aside>
          <input
            className="Form-Active"
            type={'checkbox'}
            name={'active'}
            onChange={() => setActive((prev) => !prev)}
            value={proposal && proposal.active}
          />
          <p>Activate Proposal</p>
        </aside>

        <div className={styles.proposalModalCta}>
          <button id={styles.cancel} onClick={() => setSelectedProposal(null)}>
            {' '}
            Cancel{' '}
          </button>
          <button id={styles.submit} type="submit">
            {' '}
            Submit{' '}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProposalForm;
