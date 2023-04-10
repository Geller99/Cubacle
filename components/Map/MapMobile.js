import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '../../styles/roadmap.module.scss';
import MapData from './MapData';

const MobileMap = ({ setOpenModal, show, contentId }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const handleClose = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };

  const modalContent = show ? (
    <section className={styles.mobileContainer}>
      
      {MapData?.filter((item) => contentId === item.mapId).map((map, idx) => {
        return (
          <main key={idx}>
            <header>
              <h4>
                <b>{map.mapId} </b>
                {map.mapTitle}
              </h4>
              <button onClick={handleClose} className={styles.closeBtn}>
                X
              </button>
            </header>

            <div className={styles.mapContentTag}>
              <span className={styles.tag1}>Upcoming</span>
              <span className={styles.tag2}>Completed</span>
            </div>

            <article className={styles.contentParagraph}>
              <div className={styles.fullContent}>
                {map.mapContent}
                {/* <span className={styles.contentImgMobile}>
                  <img src={map.mapImage1} alt="Content image" />
                  <img src={map.mapImage2} alt="Content image" />
                </span> */}
              </div>
            </article>
          </main>
        );
      })}
    </section>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')
    );
  } else {
    return null;
  }
};

export default MobileMap;
