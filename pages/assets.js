import Image from 'next/image';
import React from 'react';
import styles from '../styles/assets.module.scss';

const Assets = () => {
  const assests = [
    {
      assetImg: '',
      collectionName: 'Gummy Invasions',
      assetName: 'Gummy Invasions #1234',
    },
  ];

  return (
    <section className={styles.container}>
      <header></header>

      <main>
        <div className={styles.tab}>
          <p>Owned</p>
          <span>32</span>
        </div>

        <div className={styles.assets}>
          {assests.map((asset, idx) => {
            return (
              <div className={styles.asset} key={asset.assetName} >
                <Image src={asset.assetImg} alt={''} />

                <div className={styles.circles}>
                  <span id={styles.circle1}></span>
                  <span id={styles.circle2}></span>
                </div>

                <div className={styles.assetTitle}>
                  <p className={styles.collectionName}>
                    {asset.collectionName}
                  </p>

                  <p className={styles.assetName}>{asset.assetName}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </section>
  );
};

export default Assets;

/**
 * @dev created this page to display a list of all NFTs in User's wallet along with a counter indicating staking period
 *
 * This page/component also serves to monitor transfer events on the NFT contract and update the DB accordingly
 *
 *
 */
