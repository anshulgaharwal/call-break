import React from 'react'
import '../../styles/components/home/navber.css'
import { useAuth } from '../../context/AuthContext'
import Button from '../common/Button';

const Navbar = ({ activeTab, setActiveTab }) => {

    const { user, logout } = useAuth();

    return (
        <div className="navbar">
            <div className="left">
                CallBreak
            </div>
            <div className="tabs">

                <Button onClick={() => setActiveTab(0)}>Invitations</Button>
                <Button onClick={() => setActiveTab(1)}>Create Room</Button>
                <Button onClick={() => setActiveTab(2)}>Join Room</Button>
            </div>

            <div className="navbar-profile">
                <div className="info">
                    <div className="name">{user.name}</div>
                    <div className="username">{user.username}</div>
                </div>
                <div className="logout-btn">
                    <Button onClick={() => { logout() }}>Logout</Button>
                </div>
            </div>

        </div>
    )
}

export default Navbar