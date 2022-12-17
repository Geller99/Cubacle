import React from 'react';
import SideNav from './side-nav/nav';
import Header from './header/header';
import MobileHeader from './header/mobileHeader';
import layoutStyle from '../styles/layout.module.scss';
const Layout = ({ children }) => {
  return (
    <section className={layoutStyle.container}>
      <Header className={layoutStyle.desktopHeader}></Header>
      <MobileHeader className={layoutStyle.mobileHeader}></MobileHeader>
      <SideNav></SideNav>

      <main className={layoutStyle.main}>{children}</main>
    </section>
  );
};

export default Layout;
