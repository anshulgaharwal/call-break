import React from 'react'
import Button from '../components/common/Button'

const Lobby = ({setActiveTab}) => {
  const handlePrev = async () =>{
    const data = await deleteRoom();
    console.log(data.message);
    setActiveTab(0)
  }
  return (
    <div>
      <Button onClick={handlePrev}>Previous page</Button>
    </div>
  )
}

export default Lobby