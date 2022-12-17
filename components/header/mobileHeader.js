import React, { useState } from 'react';
import Image from 'next/image';
import mobileNavStyles from '../../styles/header.module.scss';
import { useRouter } from 'next/router';

const MobileHeader = () => {
  const router = useRouter();
  // const className = ['hamburgerMenu', 'hamburgerMenuShows']
  const [selected, setSelected] = useState(null);
  let i = 0;
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className={mobileNavStyles.mobileNavContainer}>
      <main>
        <div className={mobileNavStyles.leftCta}>
          <span className={mobileNavStyles.hamburger} onClick={() => toggle(i)}>
            {selected === i ? (
              <Image src={'/Images/closeIcon.svg'} height={28} width={32} alt={''} />
            ) : (
              <Image src={'/Images/hamburgerIcon.svg'} height={28} width={32} alt={''} />
            )}
          </span>

          <span
            className={mobileNavStyles.settingIcon}
            onClick={() => router.push('/')}
          >
            <Image src={'/Images/homeIcon.svg'} height={28} width={32} alt={''} />
          </span>
        </div>

        <div className={mobileNavStyles.rightCta}>
          <span className={mobileNavStyles.cta}>
            <Image src={'/Images/helpIcon.svg'} height={20} width={20}  alt={''}/>
          </span>

          <span className={mobileNavStyles.cta}>
            <Image
              src={'/Images/notificationIcon.png'}
              height={18}
              width={15}
            />
          </span>

          <div className={mobileNavStyles.userImg}>
            <Image src={'/Images/userImg.jpg'} height={32} width={32}  alt={''}/>
          </div>
        </div>
      </main>

      <div
        className={
          selected === i ? 'hamburgerMenu  hamburgerMenuShows' : 'hamburgerMenu'
        }
      >
        <ul>
          <li
            // className={navStyle.activeLink}
            onClick={() => router.push('/assets')}
          >
            <Image src={'/Images/1Icon.png'} height={32} width={32}  alt={''}/>
          </li>

          <li onClick={() => router.push('/nft')}>
            <Image src={'/Images/2Icon.png'} height={32} width={32} alt={''}/>
          </li>

          <li onClick={() => router.push('/rewards/rewards')}>
            <Image src={'/Images/3Icon.png'} height={32} width={24} alt={''} />
          </li>

          <li onClick={() => router.push('/rewards/claim')}>
            <Image src={'/Images/4Icon.png'} height={32} width={32} alt={''}/>
          </li>

          <li onClick={() => router.push('/')}>
            <Image src={'/Images/5Icon.png'} height={35} width={35} alt={''}/>
          </li>
        </ul>
      </div>

      <div className={mobileNavStyles.mobileLogo}>
        <Image src={'/Images/mobile-logo.png'} height={58} width={149} alt={''} />
      </div>

      <div className={mobileNavStyles.headerText}>
        <h3>Dashboard</h3>
        <span>
          <p>Welcome to Cubex</p>

          <Image src={'/Images/dropdownIcon.svg'} height={12} width={12} alt={''} />
        </span>
      </div>
    </div>
  );
};

export default MobileHeader;
