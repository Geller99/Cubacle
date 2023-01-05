import React, { useState } from 'react';
import styles from '../styles/roadmap.module.scss';
import Image from 'next/image';
import Map1 from '../components/Map/map1';
import Map2 from '../components/Map/map2';


const RoadMap = () => {
  const [showContent, setShowContent] = useState(false);
  const [display, setDisplay] = useState('none');
  const [visibility, setVisibility] = useState('visible');

  const [showContent2, setShowContent2] = useState(false);
  const [display2, setDisplay2] = useState('none');
  const [visibility2, setVisibility2] = useState('visible');

  const content =
    'With our new incredible artist and story writing partners Adel and noitom studios, we will have a high level professional story created and told physically through a comic book. It’s extremely important that CubeX as a brand builds itself out in many forms and this includes physical products. Creating a comic book adds depth to our company and shows we are not just a company with virtual assets, but also great physical assets. The goal is to build out our brand and ip while expanding on the story behind the Cubies and give our holders a first look at how the Cubies society lives and operates. We will be introducing some key characters in the Cubie world and society(could be your NFT). Now our holders and the NFT space will start to see that we are not just random NFTs that were created with no purpose. There is a deep rooted story behind the Cubie society and now through physical products we can bring it to life. This comic book will open up the window for many of our stories to be told and may or may not lead to many more connected to our partners. The comic book is a Q2 item and expected to launch early summer for holders through the soft staking program to have access to the physical copies.';
  const image1 = '/Images/userImg.jpg';
  const image2 = '/Images/userImg.jpg';

  return (
    <section className={styles.container}>
      <Map1 />

      <Map2 />
    </section>
  );
};

export default RoadMap;
