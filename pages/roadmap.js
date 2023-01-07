import React, { useState } from 'react';
import styles from '../styles/roadmap.module.scss';
import Image from 'next/image';
import Map1 from '../components/Map/map1';
import Map2 from '../components/Map/map2';

import MobileMap1 from '../components/Map/MobileMap1';
import MobileMap2 from '../components/Map/MobileMap2';

const RoadMap = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const mapContentModal = () => {
    setModalOpen(true);
  };


  const [modalOpen2, setModalOpen2] = useState(false);
  const mapContentModal2 = () => {
    setModalOpen2(true);
  };
  // const [showPopup, setShowPopup] = useState(false);

  return (
    <section className={styles.container}>
            {modalOpen && <MobileMap1 setOpenModal={setModalOpen} show={modalOpen} />}

            {modalOpen2 && <MobileMap2 setOpenModal2={setModalOpen2} show2={modalOpen2} />}
      <Map1 mapContentModal={mapContentModal} />

      <Map2 mapContentModal2={mapContentModal2} />

      {/* {modalOpen && <MobileMap1 setOpenModal={setModalOpen} />} */}
    </section>
  );
};

export default RoadMap;
