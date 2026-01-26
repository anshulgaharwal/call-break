import React, { useEffect, useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/room/Input";
import { deleteRoom, getRoomDetails, createInvitation, getInvitationsSent, deleteInvitation } from "../services/api";
import { useAuth } from "../context/AuthContext.jsx"
import "../styles/pages/Lobby.css";

const Lobby = ({ setActiveTab, roomId }) => {
  const { user } = useAuth();

  const [players, setPlayers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [admin, setAdmin] = useState("");

  const [receiverUsername, setReceiverUsername] = useState("");

  const handlePrev = async () => {
    try {
      if (user.username === admin) {
        const data = await deleteRoom(roomId);
        console.log(data.message);
      }
      localStorage.removeItem("roomId");
      setActiveTab(0);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSendInvitation = async () => {
    try {
      const data = await createInvitation(receiverUsername, roomId);
      const index = invitations.findIndex((invitation) => invitation._id === data._id);
      if (index === -1) {
        setInvitations([...invitations, data]);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteInvitation = async (invitationId) => {
    try {
      const data = await deleteInvitation(invitationId);
      const index = invitations.findIndex((invitation) => invitation._id === invitationId);
      if (index !== -1) {
        const newInvitations = [...invitations];
        newInvitations.splice(index, 1);
        setInvitations(newInvitations);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchRoom = async () => {
    try {
      const data = await getRoomDetails(roomId);
      setPlayers(data.users);
      setAdmin(data.admin);
    } catch (err) {
      console.error(err.message);
    }
  };


  const fetchInvitations = async () => {
    try {
      const data = await getInvitationsSent();
      setInvitations(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // refresh every 5 seconds and first time instantly
  useEffect(() => {
    fetchRoom();
    fetchInvitations();
    const interval = setInterval(() => {
      fetchRoom();
      fetchInvitations();
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  // useEffect(() => {
  //   if (!roomId) return;

  //   fetchRoom();
  //   fetchInvitations();
  // }, [roomId]);

  return (
    <div className="lobby-main">
      <div className="top">
        <div className="left">
          <Button onClick={handlePrev}>Previous page</Button>
        </div>
        <div className="right">
          <h2>Room ID: {roomId}</h2>
        </div>
      </div>
      <div className="middle">
        <div className="left">
          <h2>Players</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                {player}
                {player === admin && " (Admin)"}
              </li>
            ))}
          </ul>

        </div>
        <div className="right">

          <div className="send-invitation">
            <Input placeholder="Enter username" onChange={(e) => setReceiverUsername(e.target.value)} />
            <Button onClick={handleSendInvitation}>Send Invitation</Button>
          </div>
          <div className="sent-invitations">
            <h2>Sent Invitations</h2>
            <ul>
              {invitations.map((invitation, index) => (
                <li key={index}>
                  <div>
                    {invitation.receiver} {`(${invitation.status})`}
                  </div>
                  <div>
                    {invitation.status === 'pending' && <Button onClick={() => handleDeleteInvitation(invitation._id)}>Delete</Button>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <h2>Game is about to start</h2>
          {players.length < 4 && <p>Waiting for players...</p>}
          {players.length === 4 && <p>Room is full</p>}
        </div>
      </div>
      <div className="bottom">

      </div>
    </div>
  );
};

export default Lobby;
