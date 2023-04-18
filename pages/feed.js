import React, { useState, useEffect } from 'react';
import styles from '../styles/feed.module.scss';
import Image from 'next/image';


function getFirstLetters(sentence) {
  const words = sentence.split(' ');
  let firstLetters = '';
  for (let i = 0; i < 2; i++) {
    if (words[i]) {
      firstLetters += words[i][0];
    }
  }
  return firstLetters.toUpperCase();
}
const ProposalsFeed = () => {
  const [proposals, setProposals] = useState(null);
  const [toggleState, setToggleState] = useState(1);
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

  const toggleTab = (index) => {
    setToggleState(index);
  };

  // const sentences = [
  //   {
  //     id: 1,
  //     feedTitle: 'What is happening Folks',
  //   },
  //   {
  //     id: 2,
  //     feedTitle: 'What is happening Folks',
  //   },
  //   {
  //     id: 3,
  //     feedTitle: 'What is happening Folks',
  //   },
  //   {
  //     id: 4,
  //     feedTitle: 'What is happening Folks',
  //   },
  // ];
  // function SentenceList() {
  //   const firstLettersList = sentences.map((sentence, index) => {
  //     const firstLetters = getFirstLetters(sentence.text);
  //   });
  // }
  return (
    <section className={styles.container}>

      {/******** BEGINNING OF FEED TABS **************/}
      <div className={styles.feedTabs}>
        <span
          className={`${styles.tab} ${
            toggleState === 1 ? styles['activeTab'] : ''
          }`}
          onClick={() => toggleTab(1)}
        >
          All Proposals
          <span>02</span>
        </span>
        <div className={styles.spacer}></div>
        <span
          className={`${styles.tab} ${
            toggleState === 2 ? styles['activeTab'] : ''
          }`}
          onClick={() => toggleTab(2)}
        >
          Active Proposals <span>00</span>
        </span>
        <div className={styles.spacer}></div>
        <span
          className={`${styles.tab} ${
            toggleState === 3 ? styles['activeTab'] : ''
          }`}
          onClick={() => toggleTab(3)}
        >
          Inactive Proposals <span>00</span>
        </span>
      </div>
      {/******** END OF FEED TABS **************/}


      {/******** BEGINNING FEED HEADER **************/}
      <header>
        <h4>Votes</h4>
        <p>Welcome to the Official DAO of CubeX!</p>
      </header>
      {/******** END OF FEED HEADER **************/}


      {/******** BEGINNING FEEDS CONTAINER **************/}

      <main
        // className={styles.feeds}
        className={`${styles['feeds']} ${
          toggleState === 1 ? styles['activeFeeds'] : ''
        }`}
      >
        <div className={styles.feed}>
          {/* <span className={styles.feedImage}>LI</span> */}
          <span className={styles.feedDetails}>
            <h5>Lorem Ipsum</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              voluptate eos repellat sequi placeat inventore numquam? Illum quia
              perspiciatis incidunt. <a href="Read More"></a>
            </p>
          </span>

          <span className={styles.feedTotalVotes}> 120 Votes</span>

          <span className={styles.feedCta}>
            <button id={styles.yes}>Yes</button>
            <button id={styles.no}>No</button>
          </span>
        </div>

        <div className={styles.feed}>
          <span className={styles.feedDetails}>
            <h5>Lorem Ipsum</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              voluptate eos repellat sequi placeat inventore numquam? Illum quia
              perspiciatis incidunt. <a href="Read More"></a>
            </p>
          </span>

          <span className={styles.feedTotalVotes}> 120 Votes</span>

          <span className={styles.feedCta}>
            <button id={styles.yes}>Yes</button>
            <button id={styles.no}>No</button>
          </span>
        </div>

        <div className={styles.feed}>
          <span className={styles.feedDetails}>
            <h5>Lorem Ipsum</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              voluptate eos repellat sequi placeat inventore numquam? Illum quia
              perspiciatis incidunt. <a href="Read More"></a>
            </p>
          </span>

          <span className={styles.feedTotalVotes}> 120 Votes</span>

          <span className={styles.feedCta}>
            <button id={styles.yes}>Yes</button>
            <button id={styles.no}>No</button>
          </span>
        </div>

        <div className={styles.feed}>
          <span className={styles.feedDetails}>
            <h5>Lorem Ipsum</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              voluptate eos repellat sequi placeat inventore numquam? Illum quia
              perspiciatis incidunt. <a href="Read More"></a>
            </p>
          </span>

          <span className={styles.feedTotalVotes}> 120 Votes</span>

          <span className={styles.feedCta}>
            <button id={styles.yes}>Yes</button>
            <button id={styles.no}>No</button>
          </span>
        </div>

        <div className={styles.feed}>
          <span className={styles.feedDetails}>
            <h5>Lorem Ipsum</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
              voluptate eos repellat sequi placeat inventore numquam? Illum quia
              perspiciatis incidunt. <a href="Read More"></a>
            </p>
          </span>

          <span className={styles.feedTotalVotes}> 120 Votes</span>

          <span className={styles.feedCta}>
            <button id={styles.yes}>Yes</button>
            <button id={styles.no}>No</button>
          </span>
        </div>
      </main>

      <main
        className={`${styles['feeds']} ${
          toggleState === 2 ? styles['activeFeeds'] : ''
        }`}
      >
        <div className={styles.nullContainer}>
          <div>
            <Image
              src="/Images/nullIcon.svg"
              height={200}
              width={200}
              alt={''}
            />

            <h3>No Active Proposals</h3>
          </div>
        </div>
      </main>

      <main
        className={`${styles['feeds']} ${
          toggleState === 3 ? styles['activeFeeds'] : ''
        }`}
      >
        <div className={styles.nullContainer}>
          <div>
            <Image
              src="/Images/nullIcon.svg"
              height={200}
              width={200}
              alt={''}
            />

            <h3>No Inactive Proposals</h3>
          </div>
        </div>
      </main>
      {/******** END FEEDS CONTAINER **************/}

      {/* <div className={styles.FeedContainer}>
        <header>
          <h4>Votes</h4>
          <p>Welcome to the Official DAO of CubeX!</p>
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
      </div> */}
    </section>
  );
};

export default ProposalsFeed;
