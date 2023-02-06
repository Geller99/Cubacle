import React, { useState, useEffect } from "react";

const ProposalsFeed = () => {
  const [proposals, setProposals] = useState(null);

  const fetchActiveProposals = async () => {
    try {
      await fetch("/api/proposal-getAll")
        .then((res) => res.json())
        .then((data) => {
          console.log("Proposals data", data);
          setProposals(data.data);
        });
    } catch (error) {
      console.log("Fetch Proposals Failed", error);
    }
  };

  useEffect(() => {
    fetchActiveProposals();
  }, []);

  return (
    <div>
      {proposals &&
        proposals.map((proposal) => {
          return (
            <div
              key={proposal.title}
              style={{ display: "flex", flexDirection: "row", color: "red" }}
            >
              <p> {proposal.title}</p> -<p> {proposal.detail} </p> -
              <button> Vote Yes </button> -<button> Vote No </button>
            </div>
          );
        })}
    </div>
  );
};

export default ProposalsFeed;
