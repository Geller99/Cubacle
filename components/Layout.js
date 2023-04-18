import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SideNav from './side-nav/nav';
import Header from './header/header';
import MobileHeader from './header/mobileHeader';
import layoutStyle from '../styles/layout.module.scss';
// import darkmode from '../styles/darkmode.module.scss'
// import lightmode from '../styles/lightmode.module.scss'

// const LightModeStyles = dynamic(() => lightmode)
// const DarkModeStyles = dynamic(() => darkmode)

const Layout = ({ children }) => {
  // const [mode, setMode] = useState('light');

  // useEffect(() => {
  //   document.body.classList.remove('light', 'dark');
  //   document.body.classList.add(mode);
  // }, [mode]);

  // const toggleMode = () => {
  //   setMode(mode === 'light' ? 'dark' : 'light');
  // };
  return (
    <section className={layoutStyle.container}>
      {/* <LightModeStyles />
      <DarkModeStyles /> */}
      <Header className={layoutStyle.desktopHeader}></Header>
      <MobileHeader className={layoutStyle.mobileHeader}></MobileHeader>
      <SideNav></SideNav>

      <main className={layoutStyle.main}>{children}</main>
      {/* <button onClick={toggleMode}>Toggle Mode</button> */}
    </section>
  );
};
export default Layout;
