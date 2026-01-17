//src/pages/Login.jsx
import React from 'react'
import '../styles/pages/Login.css'
import Card from '../components/auth/card'

const Login = () => {
  return (
    <div className='container'>
        <video
        className='bgVid'
        src="/bg_vid.mp4"
        autoPlay
        loop
        muted
        playsInline/>
        <Card />
    </div>
  )
}

export default Login