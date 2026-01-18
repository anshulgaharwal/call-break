import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home = () => {

    const { user } = useAuth();

  return (
    <div>Home {user?.name}</div>
  )
}

export default Home