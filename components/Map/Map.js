import React, { useState } from 'react';
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
    <div className={styles.mapContainer}>
      {MapData.map((mapId, id) => {
        return (
          <>
            <div
              key={id}
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
              key={mapId.id}
              onClick={() => props.mapContentModal()}
            >
              {mapId.mapId}
            </div>
          </>
        );
      })}

      {MapData.map((map, id) => {
        return (
          <div
            // style={{ display }}
            id={styles.mapContentContainer}
            style={{
              display: selectedDivs.indexOf(map.idx) !== -1 ? 'flex' : 'none',
            }}
            className={styles[`mapContentContainer-${map.idx}`]}
            // className={`${styles.mapContentContainer}`}
            // className={styles.mapContentContainer}
            key={id}
          >
            <div className={styles.triangle}></div>

            <div className={styles.mapContent}>
              <header>
                <h4>
                  <b>{map.mapId} </b>
                  {map.mapTitle}
                </h4>
              </header>

              <div className={styles.mapContentTag}>
                <span className={styles.tag1}>Upcoming</span>
                <span className={styles.tag2}>Completed</span>
              </div>

              <article>
                {showContent ? (
                  <div className={styles.fullContent}>
                    {map.mapContent}
                    <small onClick={() => setShowContent(false)}>
                      See less
                    </small>
                    <span className={styles.contentImg}>
                      <img src={map.mapImage1} alt="Content image" />
                      <img src={map.mapImage2} alt="Content image" />
                    </span>
                  </div>
                ) : (
                  <div className={styles.lessContent}>
                    {map.mapContent.substring(0, 150)}...
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
