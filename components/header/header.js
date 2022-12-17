import styles from '../../styles/header.module.scss';
import Image from 'next/image';
import Profile from '../profile/profile';

const Header = () => {
  return (
    <div className={styles.home}>
      <div className={styles.headerText}>
        <h3>Dashboard</h3>
        <span>
          <p>Welcome to Cubex</p>

          <Image src={'/Images/dropdownIcon.svg'} height={12} width={12} alt={''} />
        </span>
      </div>

      <div className={styles.headerCta}>

       <Profile/>
        
        {/* <span className={styles.cta}>
          <Image src={'/Images/helpIcon.svg'} height={28} width={28} />
        </span> */}
        <span className={styles.cta}>
          <Image src={'/Images/notificationIcon.png'} height={28} width={22} alt={''} />
        </span>

        <div className={styles.userImg}>
          <Image src={'/Images/userImg.jpg'} height={50} width={50}  alt={''}/>
        </div>
      </div>
    </div>
  );
};

export default Header;
