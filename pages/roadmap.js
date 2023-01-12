import React, { useState } from 'react';
import styles from '../styles/roadmap.module.scss';
import Image from 'next/image';
import Map from '../components/Map/Map';
import MobileMap from '../components/Map/MapMobile';

const RoadMap = ({ MapData }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const mapContentModal = () => {
    setModalOpen(true);
  };


  return (

    <section className={styles.container}>
      <MobileMap
        setOpenModal={setModalOpen}
        show={modalOpen}
      />

      <Map mapContentModal={mapContentModal} />
    </section>
  );
};

export default RoadMap;
