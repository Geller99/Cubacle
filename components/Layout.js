import React from 'react';
import {MyStore} from "../state/myStore";
import {useDisconnect} from 'wagmi';

import SideNav from './side-nav/nav';
import Header from './header/header';
import MobileHeader from './header/mobileHeader';
import layoutStyle from '../styles/layout.module.scss';
// import darkmode from '../styles/darkmode.module.scss'
// import lightmode from '../styles/lightmode.module.scss'

// const LightModeStyles = dynamic(() => lightmode)
// const DarkModeStyles = dynamic(() => darkmode)

// const Layout = ({ children }) => {
  // const [mode, setMode] = useState('light');

  // useEffect(() => {
  //   document.body.classList.remove('light', 'dark');
  //   document.body.classList.add(mode);
  // }, [mode]);

  // const toggleMode = () => {
  //   setMode(mode === 'light' ? 'dark' : 'light');
  // };

const Layout = ({ children }) => {
  const session = React.useContext(MyStore);
  const { disconnect } = useDisconnect();


  /**
   * @dev needs to
   *
   * Connect user wallet
   * Run function to grab signature from user using EIP typedData()
   * Check if user signs or not
   *
   * IF signed, hit /api/auth to determine admin/user status give access to dapp and stay logged in
   * Else disconnect
   */

  // Logic:
  // premise: we don't know the address until the provider is connected
  //   so we'll wait for the address to exist
  // 1. when we have the address, check if a signature exists
  // 2. if it exists, check if it's valid
  // 3. if it's valid, we can add this to state
  // else. generate a new signature
  //
  // NOTE: we need to keep the data so that the timstamp doesn't change
  const handleInit = async () => {
    //session.init(disconnect);

    if (await session.isValid())
      return;


    const isConnected = await session.start();
    if(!isConnected){
      //cleanup
      if(session.address || session.connector){
        await disconnect();
      }
      
      await session.stop(true);
    }
  };


  // always check
  React.useEffect(() => {
    console.log('>>>>> Layout <<<<');
    handleInit();
  });

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
