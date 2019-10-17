import React, { useState } from 'react'
import Modal from 'react-modal-lite'

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='App' style={{
      textAlign: 'center'
    }}>
      <header className='App-header'>
        <h1 className='App-title'>Basic modal example</h1>
      </header>
      <main>
        <button
          onClick={() => {
            setIsModalOpen(true)
          }}
          >Open modal</button>
      </main>
      <Modal
        isVisible={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
        }}
        showCloseButton
        >Basic modal example.</Modal>
    </div>
  )
}

export default App
