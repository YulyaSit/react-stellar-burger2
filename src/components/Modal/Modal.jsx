import ModalOverlay from "../ModalOverlay/ModalOverlay";
import stylesModal from './Modal.module.css'
import ReactDOM from "react-dom";
import React from 'react'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types'
Modal.propTypes = ({
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  close: PropTypes.func.isRequired
})

function Modal({ title, children, close }) {
  React.useEffect(() => {
    const closePopupEsc = (evt) => {
      if (evt.key === "Escape") {
        close()
      }
    };
    document.addEventListener("keydown", closePopupEsc);
    return () => {
      document.removeEventListener("keydown", closePopupEsc);
    };
  }, [close]);
  return ReactDOM.createPortal(
    <>
      <ModalOverlay closeOverlay={close} />
      <div className={stylesModal.modal}>
        <div className={stylesModal.container}>
          {title && <h2 className={`${stylesModal.title} text text_type_main-large`}>{title}</h2>}
          <div className={stylesModal.icon} onClick={close} ><CloseIcon /></div>
        </div>
        {children}
      </div>
    </>,
    document.querySelector('#react-modals')
  )
}

export default Modal