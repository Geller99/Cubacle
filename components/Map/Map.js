import React, { useState, useEffect, useRef } from 'react';
import MapData from './MapData';
import styles from '../../styles/roadmap.module.scss';
import Image from 'next/image';

const Map = (props) => {
  const [showContent, setShowContent] = useState(false);
  const [selectedDivs, setSelectedDivs] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (i) => {
    setSelectedDivs([i]);
    setSelectedButton(i);
  };


  return (
    <div

      className={styles.mapContainer + ' ' + 'scroll-container'}
    >
      <Image
        className={styles.mapImage}
        src={'/Images/Map1New.jpg'}
        layout="fill"
        alt={''}
      />
      {MapData.map((mapId, idx) => {
        return (
          <>
            <div
              key={mapId.idx}
              id={styles.mapId}
              className={styles[`mapId-${mapId.idx}`]}
              onClick={() => handleButtonClick(mapId.idx)}
              style={{
                display: selectedButton === mapId.idx ? 'none' : 'flex',
              }}
            >
              {mapId.mapId}
            </div>

            <div
              id={styles.mobileMapId}
              className={styles[`mapId-${mapId.idx}`] + ' ' + styles.mat}
              key={mapId.idx}
              style={{
                display: props.selectedButton === mapId.idx ? 'none' : 'flex',
              }}
              onClick={() => props.mapContentModal(mapId.mapId)}
            >
              {mapId.mapId}
            </div>
          </>
        );
      })}

      {MapData.map((mapContent, idx) => {
        return (
          <div
            id={styles.mapContentContainer}
            style={{
              display:
                selectedDivs.indexOf(mapContent.idx) !== -1 ? 'flex' : 'none',
            }}
            className={styles[`mapContentContainer-${mapContent.idx}`]}
            key={mapContent.idx}
          >
            <div className={styles.triangle}></div>

            <div className={styles.mapContent}>
              <header>
                <h4>
                  <b>{mapContent.mapId} </b>
                  {mapContent.mapTitle}
                </h4>
              </header>

              <div className={styles.mapContentTag}>
                <span className={styles.tag1}>Upcoming</span>
                <span className={styles.tag2}>Completed</span>
              </div>

              <article>
                {showContent ? (
                  <div className={styles.fullContent}>
                    {mapContent.mapContent}
                    <small onClick={() => setShowContent(false)}>
                      See less
                    </small>
                    <span className={styles.contentImg}>
                      <img src={mapContent.mapImage1} alt="Content image" />
                      <img src={mapContent.mapImage2} alt="Content image" />
                    </span>
                  </div>
                ) : (
                  <div className={styles.lessContent}>
                    {mapContent.mapContent.substring(0, 180)}...
                    <small onClick={() => setShowContent(true)}>See more</small>
                  </div>
                )}
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Map;
