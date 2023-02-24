import React, { useState, useEffect } from 'react';
import styles from '../styles/feed.module.scss';
const ProposalsFeed = () => {
  const [proposals, setProposals] = useState(null);

  const fetchActiveProposals = async () => {
    try {
      await fetch('/api/proposal-getAll')
        .then((res) => res.json())
        .then((data) => {
          console.log('Proposals data', data);
          setProposals(data.data);
        });
    } catch (error) {
      console.log('Fetch Proposals Failed', error);
    }
  };

  useEffect(() => {
    fetchActiveProposals();
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.FeedContainer}>
        <header>
          <h4>Votes</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </header>
        <main>
          {proposals &&
            proposals.map((proposal) => {
              return (
                <div
                  key={proposal.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    color: 'red',
                  }}
                >
                  <span className={styles.voteDetails}>
                    <h5> {proposal.title}</h5>
                    <p> {proposal.detail} </p>
                  </span>

                  <span className={styles.voteCta}>
                    <button id={styles.yes}> Vote Yes </button>
                    <button id={styles.no}> Vote No </button>
                  </span>
                </div>
              );
            })}
        </main>
      </div>
    </section>
  );
};

export default ProposalsFeed;
