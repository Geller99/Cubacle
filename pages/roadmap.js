import React, { useState } from 'react';
import styles from '../styles/roadmap.module.scss';
import Image from 'next/image';
import Map from '../components/Map/Map';
import MobileMap from '../components/Map/MapMobile';

const RoadMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [contentId, setContentId] = useState(null);

  const mapContentModal = (id) => {
    setModalOpen(true);
    setContentId(id);
  };

  return (
    <section className={styles.container}>
      <MobileMap
        setOpenModal={setModalOpen}
        show={modalOpen}
        contentId={contentId}
      />

      <Map mapContentModal={mapContentModal} />
    </section>
  );
};

export default RoadMap;
