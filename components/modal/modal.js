import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from '../../styles/modal.module.scss';

const Modal = ({ show, onClose, children, title }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.ModalWrapper}>
      <div className={styles.ModalBody}>
<<<<<<< Updated upstream
        <div className={styles.ModalHeader} >
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </div>
=======
        <header className={styles.ModalHeader} >

          <h4>Claiming Reward</h4>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </header>

>>>>>>> Stashed changes
        {title && <div>{title}</div>}
        <div>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};


export default Modal;