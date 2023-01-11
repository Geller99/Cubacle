import React, { useState } from 'react';
import styles from '../styles/roadmap.module.scss';
import Image from 'next/image';
import Map1 from '../components/Map/map1';
import Map2 from '../components/Map/map2';
import Map3 from '../components/Map/map3';
import Map4 from '../components/Map/map4';
import Map5 from '../components/Map/map5';
import Map6 from '../components/Map/map6';
import Map7 from '../components/Map/map7';
import Map9 from '../components/Map/map9';
import Map10 from '../components/Map/map10';
import Map11 from '../components/Map/map11';
import Map12 from '../components/Map/map12';
import Map13 from '../components/Map/map13';
import Map14 from '../components/Map/map14';
import Map15 from '../components/Map/map15';
import Map16 from '../components/Map/map16';

import MobileMap1 from '../components/Map/MobileMap1';
import MobileMap2 from '../components/Map/MobileMap2';
import MobileMap3 from '../components/Map/MobileMap3';
import MobileMap4 from '../components/Map/MobileMap4';
import MobileMap5 from '../components/Map/MobileMap5';
import MobileMap6 from '../components/Map/MobileMap6';
import MobileMap7 from '../components/Map/MobileMap7';
import MobileMap9 from '../components/Map/MobileMap9';
import MobileMap10 from '../components/Map/MobileMap10';
import MobileMap11 from '../components/Map/MobileMap11';
import MobileMap12 from '../components/Map/MobileMap12';
import MobileMap13 from '../components/Map/MobileMap13';
import MobileMap14 from '../components/Map/MobileMap14';
import MobileMap15 from '../components/Map/MobileMap15';
import MobileMap16 from '../components/Map/MobileMap16';

const RoadMap = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const mapContentModal = () => {
    setModalOpen(true);
  };

  const [modalOpen2, setModalOpen2] = useState(false);
  const mapContentModal2 = () => {
    setModalOpen2(true);
  };

  const [modalOpen3, setModalOpen3] = useState(false);
  const mapContentModal3 = () => {
    setModalOpen3(true);
  };

  const [modalOpen4, setModalOpen4] = useState(false);
  const mapContentModal4 = () => {
    setModalOpen4(true);
  };

  const [modalOpen5, setModalOpen5] = useState(false);
  const mapContentModal5 = () => {
    setModalOpen5(true);
  };

  const [modalOpen6, setModalOpen6] = useState(false);
  const mapContentModal6 = () => {
    setModalOpen6(true);
  };

  const [modalOpen7, setModalOpen7] = useState(false);
  const mapContentModal7 = () => {
    setModalOpen7(true);
  };

  const [modalOpen9, setModalOpen9] = useState(false);
  const mapContentModal9 = () => {
    setModalOpen9(true);
  };

  const [modalOpen10, setModalOpen10] = useState(false);
  const mapContentModal10 = () => {
    setModalOpen10(true);
  };

  const [modalOpen11, setModalOpen11] = useState(false);
  const mapContentModal11 = () => {
    setModalOpen11(true);
  };

  const [modalOpen12, setModalOpen12] = useState(false);
  const mapContentModal12 = () => {
    setModalOpen12(true);
  };

  const [modalOpen13, setModalOpen13] = useState(false);
  const mapContentModal13 = () => {
    setModalOpen13(true);
  };

  const [modalOpen14, setModalOpen14] = useState(false);
  const mapContentModal14 = () => {
    setModalOpen14(true);
  };

  const [modalOpen15, setModalOpen15] = useState(false);
  const mapContentModal15 = () => {
    setModalOpen15(true);
  };

  const [modalOpen16, setModalOpen16] = useState(false);
  const mapContentModal16 = () => {
    setModalOpen16(true);
  };

  return (
    <section className={styles.container}>
      {modalOpen && <MobileMap1 setOpenModal={setModalOpen} show={modalOpen} />}

      {modalOpen2 && (
        <MobileMap2 setOpenModal2={setModalOpen2} show2={modalOpen2} />
      )}

      {modalOpen3 && (
        <MobileMap3 setOpenModal3={setModalOpen3} show3={modalOpen3} />
      )}

      {modalOpen4 && (
        <MobileMap4 setOpenModal4={setModalOpen4} show4={modalOpen4} />
      )}

      {modalOpen5 && (
        <MobileMap5 setOpenModal5={setModalOpen5} show5={modalOpen5} />
      )}

      {modalOpen6 && (
        <MobileMap6 setOpenModal6={setModalOpen6} show6={modalOpen6} />
      )}

      {modalOpen7 && (
        <MobileMap7 setOpenModal7={setModalOpen7} show7={modalOpen7} />
      )}

      {modalOpen9 && (
        <MobileMap9 setOpenModal9={setModalOpen9} show9={modalOpen9} />
      )}

      {modalOpen10 && (
        <MobileMap10 setOpenModal10={setModalOpen10} show10={modalOpen10} />
      )}

      {modalOpen11 && (
        <MobileMap11 setOpenModal11={setModalOpen11} show11={modalOpen11} />
      )}

      {modalOpen12 && (
        <MobileMap12 setOpenModal12={setModalOpen12} show12={modalOpen12} />
      )}

      {modalOpen13 && (
        <MobileMap13 setOpenModal13={setModalOpen13} show13={modalOpen13} />
      )}

      {modalOpen14 && (
        <MobileMap14 setOpenModal14={setModalOpen14} show14={modalOpen14} />
      )}

      {modalOpen15 && (
        <MobileMap15 setOpenModal15={setModalOpen15} show15={modalOpen15} />
      )}

      {modalOpen16 && (
        <MobileMap16 setOpenModal16={setModalOpen16} show16={modalOpen16} />
      )}

      <Map1 mapContentModal={mapContentModal} />

      <Map2 mapContentModal2={mapContentModal2} />

      <Map3 mapContentModal3={mapContentModal3} />

      <Map4 mapContentModal4={mapContentModal4} />

      <Map5 mapContentModal5={mapContentModal5} />

      <Map6 mapContentModal6={mapContentModal6} />

      <Map7 mapContentModal7={mapContentModal7} />

      <Map9 mapContentModal9={mapContentModal9} />

      <Map10 mapContentModal10={mapContentModal10} />

      <Map11 mapContentModal11={mapContentModal11} />

      <Map12 mapContentModal12={mapContentModal12} />

      <Map13 mapContentModal13={mapContentModal13} />

      <Map14 mapContentModal14={mapContentModal14} />

      <Map15 mapContentModal15={mapContentModal15} />

      <Map16 mapContentModal16={mapContentModal16} />

      {/* {modalOpen && <MobileMap1 setOpenModal={setModalOpen} />} */}
    </section>
  );
};

export default RoadMap;
