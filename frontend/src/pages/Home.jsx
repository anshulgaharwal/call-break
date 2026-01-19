import React, { useState } from 'react'
import Invitations from '../components/home/Invitations'
import Room from '../components/home/Room'
import Navbar from '../components/home/Navbar'

const Home = () => {

  const [activeTab, setActiveTab] = useState(0);

  return (<>
    <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    {activeTab === 0 && <Invitations key={"0"} />}
    {activeTab === 1 && <Room key={"1"} type="create" />}
    {activeTab === 2 && <Room key={"2"} type="join" />}
  </>
  )
}

export default Home