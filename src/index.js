import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Isvg from 'react-inlinesvg'
import iconCloseSvg from './assets/icon-close.svg'
import './index.css'

export default class Modal extends Component {
  static propTypes = {
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

  static defaultProps = {
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

  constructor(props) {
    super(props)

    this.state = {
      isVisible: props.defaultVisible,
    }
  }

  componentDidMount() {
    window.addEventListener(`keydown`, this.listenKeyboard, true)
  }

  componentWillUnmount() {
    window.removeEventListener(`keydown`, this.listenKeyboard, true)
  }

  listenKeyboard = (e) => {
    if (this.props.disableEscape === false && e.keyCode === 27) {
      this.hide()
    }
  }

  hide() {
    this.setState({
      isVisible: false,
    })
    this.props.onClose()
  }

  render() {
    return (
      <div
        className={`Modal${this.props.className !== `` ? ` ${this.props.className}` : ``}`}
        styles={this.props.style}
      >
        { this.state.isVisible || this.props.isVisible ? (
          <div
            className='modal-container'
            onClick={() => {
              if (this.props.disableClickOut === false) {
                this.hide()
              }
            }}
          >
            <div className='flexbox-center-container'>
              <div
                className={`modal-foreground${this.props.foregroundClassName !== `` ? ` ${this.props.foregroundClassName}` : ``}`}
                onClick={(e) => { e.stopPropagation() }}
              >
                { this.props.showCloseButton === true
                  ? <div className='close-btn-container'>
                    <button className='btn-close' onClick={() => { this.hide() }}>
                      <Isvg src={iconCloseSvg} />
                    </button>
                  </div>
                  : null
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
