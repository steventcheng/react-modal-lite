import React, { Component } from 'react'
import Modal from 'react-modal-lite'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Basic modal example</h1>
        </header>
        <Modal isVisible>Basic modal example.</Modal>
      </div>
    )
  }
}

export default App
