import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '../../../styles/admin.module.scss';
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
    console.log('Deleting...');
    try {
      await axios({
        method: 'post',
        url: 'http://localhost:3000/api/proposal-delete',
        data: {
          title: proposal.title,
        },
      });
      setProposals(null);
      alert('Successfully Deleted');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.proposal}>
      <p> {title && title} </p>
      {/* <p> {detail && detail} </p> */}
      {/* <p> {image && image} </p> */}
      {/* <p> {eligibilityCount} </p> */}
      {/* <p> status {active && active} </p>
        <p> +votes {positiveVoteCount && positiveVoteCount} </p>
        <p> +votes {negativeVoteCount && negativeVoteCount} </p> */}

      <div className={styles.rewardCta}>
        <button
          id={styles.editProposal}
          style={{ background: '#3D0DDF' }}
          onClick={() => setSelectedProposal(proposal)}
        >
          <Image src={'/Images/editIcon.svg'} height={16} width={16} alt={''} />
        </button>
        <button
          id={styles.deleteProposal}
          style={{ background: '#39B5DC' }}
          onClick={() => handleDeleteProposal()}
        >
          <Image
            src={'/Images/deleteIcon.svg'}
            height={16}
            width={16}
            alt={''}
          />
        </button>
      </div>
    </div>
  );
};

export default ProposalItem;
