import React from 'react'
import overlayStyles from './ModalOverlay.module.css'
import PropTypes from 'prop-types'
ModalOverlay.propTypes = ({
    closeOverlay: PropTypes.func.isRequired
})


function ModalOverlay({closeOverlay}) {
    return(
        <div className={overlayStyles.overlay} onClick={closeOverlay}></div>
    )
}

export default ModalOverlay