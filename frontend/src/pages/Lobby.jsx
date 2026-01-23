import React from 'react'
import Button from '../components/common/Button'
import { deleteRoom } from '../services/api';

const Lobby = ({setActiveTab, roomId}) => {
  const handlePrev = async () =>{
    const data = await deleteRoom(roomId);
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