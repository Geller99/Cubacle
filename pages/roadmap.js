import React, { useState, useEffect, useRef, forwardRef } from 'react';
import bowser from 'bowser';
import styles from '../styles/roadmap.module.scss';

import Map from '../components/Map/Map';
import MobileMap from '../components/Map/MapMobile';

const RoadMap = forwardRef((props, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [contentId, setContentId] = useState(null);

  const mapContentModal = (id) => {
    setModalOpen(true);
    setContentId(id);
  };


  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const _scroller = useRef(null);

  useEffect(() => {
      if (isScrolling) {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      } else {
        window.removeEventListener('mousemove', onMouseMove);
      }
    
  }, [isScrolling]);

  const onScroll = (event) => {};

  const onMouseMove = (event) => {
      _scroller.current.scrollLeft = scrollLeft - clientX + event.clientX;
      _scroller.current.scrollTop = scrollTop - clientY + event.clientY;
    
  };

  const onMouseUp = () => {
    setIsScrolling(false);
    setScrollLeft(0);
    setScrollTop(0);
    setClientX(0);
    setClientY(0);
  };

  const onMouseDown = (event) => {
    setIsScrolling(true);
    setScrollLeft(_scroller.current.scrollLeft);
    setScrollTop(_scroller.current.scrollTop);
    setClientX(event.clientX);
    setClientY(event.clientY);
  };
  const attachScroller = (scroller) => {
    _scroller.current = scroller;
  };
  return (
    <>
      <section
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        ref={attachScroller}
        id={styles.containerWindows}
        className={styles.container}
      >
        <MobileMap
          setOpenModal={setModalOpen}
          show={modalOpen}
          contentId={contentId}
        />

        <Map mapContentModal={mapContentModal} />
      </section>
      <section
        id={styles.containerMobile}
        className={styles.container}
      >
        <MobileMap
          setOpenModal={setModalOpen}
          show={modalOpen}
          contentId={contentId}
        />

        <Map mapContentModal={mapContentModal} />
      </section>
    </>
  );
});

export default RoadMap;
