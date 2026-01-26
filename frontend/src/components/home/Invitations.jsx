import React, { useEffect, useState } from "react";
import "../../styles/components/home/Invitations.css";
import acceptImg from "../../assets/accept.png";
import declineImg from "../../assets/decline.png";
import { useAuth } from "../../context/AuthContext";
import { getInvitations, acceptInvitation, rejectInvitation } from "../../services/api";

const Invitations = () => {

  const { user } = useAuth();

  const [invitations, setInvitations] = useState([]);

  const fetchInvitations = async () => {
    try {
      const data = await getInvitations();
      setInvitations(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAccept = async (invitationId) => {
    try {
      const data = await acceptInvitation(invitationId);
      if (data.status === "success") {
        fetchInvitations();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDecline = async (invitationId) => {
    try {
      const data = await rejectInvitation(invitationId);
      if (data.status === "success") {
        fetchInvitations();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // refesh every 5 sec
  useEffect(() => {
    fetchInvitations();
    const interval = setInterval(() => {
      fetchInvitations();
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="invite-parent">
      <div className="invite-header">
        <h2>Invitations</h2>
      </div>
      <div className="contain-invites">
        {invitations.map((invitation, index) => (
          <div className="invite" key={index}>
            <div className="info">
              <p>{invitation.sender} has invite you to game!!</p>
            </div>
            <div className="action">
              <div className="accept">
                <img src={acceptImg} alt="" onClick={() => handleAccept(invitation._id)} />
              </div>
              <div className="decline">
                <img src={declineImg} alt="" onClick={() => handleDecline(invitation._id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invitations;
