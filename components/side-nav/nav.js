import React from 'react';
import navStyle from '../../styles/sidenav.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SideNav = () => {
  const router = useRouter();

  // // console.log(navStyle, 'helle');
  return (
    <div className={navStyle.container}>
      <div className={navStyle.logo}>
        <Image src={'/Images/logo.png'} height={68} width={62} alt={''} />
      </div>

      <div className={navStyle.blueBorder}></div>

      <main className={navStyle.navLinksContainer}>
        <ul>
          <li onClick={() => router.push('/')}>
            <Image src={'/Images/homeIcon.svg'} height={36} width={36} alt={''}/>
          </li>

          <li
            className={navStyle.activeLink}
            onClick={() => router.push('/assets')}
          >
            <Image src={'/Images/1Icon.png'} height={36} width={36} alt={''} />
          </li>

          <li onClick={() => router.push('/nft')}>
            <Image src={'/Images/2Icon.png'} height={36} width={36} alt={''}/>
          </li>

          <li onClick={() => router.push('/rewards/rewards')}>
            <Image src={'/Images/3Icon.png'} height={36} width={28} alt={''}/>
          </li>

          <li onClick={() => router.push('/rewards/claim')}>
            <Image src={'/Images/4Icon.png'} height={32} width={30} alt={''} />
          </li>

          <li onClick={() => router.push('/')}>
            <Image src={'/Images/5Icon.png'} height={35} width={35} alt={''} />
          </li>
        </ul>
      </main>

      {/* <div className={navStyle.logo}>
        <Image src={'/Images/settingIcon.png'} height={33} width={33} />
      </div> */}
    </div>
  );
};

export default SideNav;
