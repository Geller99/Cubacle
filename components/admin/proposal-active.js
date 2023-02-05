import { useState } from "react";
import { useEffect } from "react";
import ProposalItem from "./proposalItem/proposalItem";

/**
 *
 * @returns list of all active proposals
 */

const ActiveProposals = () => {
  const [proposals, setProposals] = useState(null);

  /**
   * @dev will run this effect everytime a new form is created or a previous one is updated
   */

  useEffect(() => {
    fetchActiveProposals();
  }, []);

  const fetchActiveProposals = async () => {
    await fetch("/api/proposal-getAll")
      .then((res) => res.json())
      .then((data) => {
        console.log("Proposals data", data);
        setProposals(data.data);
      });
  };

  return (
    <div>
      {proposals &&
        proposals.map((data) => {
          return (
            <ProposalItem
              key={data.title}
              title={data.title}
              detail={data.detail}
              active={data.active}
              positiveCount={data.positiveCount}
              negativeCount={data.negativeCount}
            />
          );
        })}
    </div>
  );
};

export default ActiveProposals;
