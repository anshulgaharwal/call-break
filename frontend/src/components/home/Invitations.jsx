import React from "react";
import "../../styles/components/home/Invitations.css";
import acceptImg from "../../assets/accept.png";
import declineImg from "../../assets/decline.png";

const Invitations = () => {
  return (
    <div className="invite-parent">
      <div className="invite-header">
        <h2>Invitations</h2>
      </div>
      <div className="contain-invites">
        <div className="invite">
          <div className="info">
            <p>Anshul has invite you to game!!</p>
          </div>
          <div className="action">
            <div className="accept">
              <img src={acceptImg} alt="" />
            </div>
            <div className="decline">
              <img src={declineImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invitations;
