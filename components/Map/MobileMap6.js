import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '../../styles/roadmap.module.scss';

const MobileMap6 = ({ setOpenModal6, show6 }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const handleClose = (e) => {
    e.preventDefault();
    setOpenModal6(false);
  };

  const content =
    'With our new incredible artist and story writing partners Adel and noitom studios, we will have a high level professional story created and told physically through a comic book. It’s extremely important that CubeX as a brand builds itself out in many forms and this includes physical products. Creating a comic book adds depth to our company and shows we are not just a company with virtual assets, but also great physical assets. The goal is to build out our brand and ip while expanding on the story behind the Cubies and give our holders a first look at how the Cubies society lives and operates. We will be introducing some key characters in the Cubie world and society(could be your NFT). Now our holders and the NFT space will start to see that we are not just random NFTs that were created with no purpose. There is a deep rooted story behind the Cubie society and now through physical products we can bring it to life. This comic book will open up the window for many of our stories to be told and may or may not lead to many more connected to our partners. The comic book is a Q2 item and expected to launch early summer for holders through the soft staking program to have access to the physical copies.';
  const image1 = '/Images/userImg.jpg';
  const image2 = '/Images/userImg.jpg';

  const modalContent6 = show6 ? (
    <section className={styles.mobileContainer}>
      <main>
        <header>
          <span>
            <h4>
              <b>#6 </b>Collectibles & Action Figures
            </h4>
          </span>

          <button onClick={handleClose} className={styles.closeBtn}>
            X
          </button>
        </header>

        <div className={styles.mapContentTag}>
          <span className={styles.tag1}>Upcoming</span>
          <span className={styles.tag2}>Completed</span>
        </div>

        <article className={styles.contentParagraph}>
          {content}
          <span className={styles.contentImgMobile}>
            <img src={image1} alt="Content image" />
            <img src={image2} alt="Content image" />
          </span>
        </article>
      </main>
    </section>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent6,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
};

export default MobileMap6;
