import ProposalItem from "./proposalItem/proposalItem";
import styles from '../../styles/admin.module.scss'
/**
 *
 * @returns list of all active proposals
 */

const ActiveProposals = ({ proposals, setProposals, setSelectedProposal }) => {
  return (
    <div className={styles.activeProposals}>
      {proposals &&
        proposals.map((proposal) => {
          return (
            <ProposalItem
              key={proposal.title}
              title={proposal.title}
              detail={proposal.detail}
              active={proposal.active}
              positiveCount={proposal.positiveCount}
              negativeCount={proposal.negativeCount}
              setSelectedProposal={setSelectedProposal}
              proposal={proposal}
              setProposals={setProposals}
            />
          );
        })}
    </div>
  );
};

export default ActiveProposals;
