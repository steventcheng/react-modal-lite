import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Isvg from 'react-inlinesvg'
import iconCloseSvg from './assets/icon-close.svg'
import './index.css'

const ModalLite = (props) => {
  const [isVisible, setIsVisible] = useState(props.defaultVisible)

  const handleCloseModal = () => {
    setIsVisible(false)
    props.onClose()
  }

  const listenKeyboard = (e) => {
    if (props.disableEscape === false && e.keyCode === 27) {
      handleCloseModal()
    }
  }

  useEffect(() => {
    window.addEventListener(`keydown`, listenKeyboard, true)
    return () => {
      window.removeEventListener(`keydown`, listenKeyboard, true)
    }
  })

  return (
    <div
      className={`Modal${props.className !== `` ? ` ${props.className}` : ``}`}
      styles={props.style}
    >
      { isVisible || props.isVisible ? (
        <div
          className='modal-container'
          onClick={() => {
            if (props.disableClickOut === false) {
              handleCloseModal()
            }
          }}
        >
          <div className='flexbox-center-container'>
            <div
              className={`modal-foreground${props.foregroundClassName !== `` ? ` ${props.foregroundClassName}` : ``}`}
              onClick={(e) => { e.stopPropagation() }}
            >
              { props.showCloseButton === true
                ? <div className='close-btn-container'>
                  <button className='btn-close' onClick={handleCloseModal}>
                    <Isvg src={iconCloseSvg} />
                  </button>
                </div>
                : null
              }
              {props.children}
            </div>
          </div>
        </div>
        ) : null
      }
    </div>
  )
}

ModalLite.propTypes = {
  // Contents to display in modal.
  children: PropTypes.node.isRequired,
  // Set true to show the modal on mount.
  defaultVisible: PropTypes.bool,
  // Disable hiding the modal on escape key press.
  disableEscape: PropTypes.bool,
  // Disable hiding the modal when clicking outside of the modal.
  disableClickOut: PropTypes.bool,
  // Whether or not the modal is visible.
  isVisible: PropTypes.bool,
  // Function called when the modal is hidden.
  onClose: PropTypes.func,
  // Show close button that hides the modal when clicked.
  showCloseButton: PropTypes.bool,
  // CSS class name to be applied to the outer-most container.
  className: PropTypes.string,
  // CSS class name to be applied to the modal foreground.
  foregroundClassName: PropTypes.string,
  // Styles for the modal applied to the outer-most container.
  style: PropTypes.object,
}

ModalLite.defaultProps = {
  defaultVisible: false,
  disableEscape: false,
  className: ``,
  disableClickOut: false,
  foregroundClassName: ``,
  isVisible: true,
  onClose: () => {},
  showCloseButton: false,
  style: {},
}

export default ModalLite
