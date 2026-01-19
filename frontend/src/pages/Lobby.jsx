import React from 'react'
import Button from '../components/common/Button'

const Lobby = ({setActiveTab}) => {
  return (
    <div>
      <Button onClick={() => setActiveTab(0)}>Previous page</Button>
    </div>
  )
}

export default Lobby