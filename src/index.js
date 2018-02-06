import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Isvg from 'react-inlinesvg'
import iconCloseSvg from './assets/icon-close.svg'
import './index.css'

export default class Modal extends Component {
  static propTypes = {
    // Contents to display in modal.
    children: PropTypes.node.isRequired,
    // Hide modal when clicking outside of the modal.
    enableClickOut: PropTypes.bool,
    // Disable hiding the modal on escape key press.
    disableEscape: PropTypes.bool,
    // Function called when the modal is hidden.
    onClose: PropTypes.func,
    // Show close button that hides the modal when clicked.
    showClosebutton: PropTypes.bool,
    // Whether or not the modal is visible.
    isVisible: PropTypes.bool,
  }

  static defaultProps = {
    enableClickOut: true,
    disableEscape: false,
    onClose: () => {},
    showClosebutton: false,
    isVisible: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      isVisible: props.isVisible,
    }
  }

  componentDidMount() {
    window.addEventListener(`keydown`, this.listenKeyboard, true)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVisible: nextProps.isVisible,
    })
  }

  componentWillUnmount() {
    window.removeEventListener(`keydown`, this.listenKeyboard, true)
  }

  listenKeyboard = (e) => {
    if (!this.props.disableEscape && e.keyCode === 27) {
      this.hide()
    }
  }

  hide() {
    this.setState({
      isVisible: false,
    })
    this.props.onClose()
  }

  show() {
    this.setState({
      isVisible: true,
    })
  }

  render() {
    const {
      enableClickOut,
      showClosebutton,
    } = this.props

    return (
      <div className='Modal'>
        { this.state.isVisible ? (
          <div
            className='modal-container'
            onClick={() => {
              if (enableClickOut) {
                this.hide()
              }
            }}
          >
            <div className='flexbox-center-container'>
              <div
                className='modal-foreground'
                onClick={(e) => { e.stopPropagation() }}
              >
                { showClosebutton &&
                  <div className='close-btn-container'>
                    <button className='btn-close' onClick={() => { this.hide() }}>
                      <Isvg src={iconCloseSvg} />
                    </button>
                  </div>
                }
                {this.props.children}
              </div>
            </div>
          </div>
          ) : null
        }
      </div>
    )
  }
}
