import React from 'react';
import assetStyles from '../styles/assets.module.scss';
import Image from 'next/';

const assets = () => {
  const assests = [
    {
      assetImg: '',
      collectionName: 'Gummy Invasions',
      assetName: 'Gummy Invasions #1234',
    },
  ];

  return (
    <section className={assetStyles.container}>
      <header></header>

      <main>
        <div className={assetStyles.tab}>
          <p>Owned</p>
          <span>32</span>
        </div>

        <div className={assetStyles.assets}>
          {assests.map((asset, idx) => {
            return (
              <div className={assetStyles.asset} key={asset.assetName} >
                <Image src={asset.assetImg} alt={''} />

                <div className={assetStyles.circles}>
                  <span id={assetStyles.circle1}></span>
                  <span id={assetStyles.circle2}></span>
                </div>

                <div className={assetStyles.assetTitle}>
                  <p className={assetStyles.collectionName}>
                    {asset.collectionName}
                  </p>

                  <p className={assetStyles.assetName}>{asset.assetName}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </section>
  );
};

export default assets;

/**
 * @dev created this page to display a list of all NFTs in User's wallet along with a counter indicating staking period
 *
 * This page/component also serves to monitor transfer events on the NFT contract and update the DB accordingly
 *
 *
 */
