// TODO: Card component
import React from "react";
import "../../styles/components/game/Card.css";
import heart from "../../assets/heart.png";

const Card = () => {
  return (
    <div className="card-parent">
      <div className="card-base">
        <div className="card-left">
        <div>
          <p>A</p>
        </div>
        <div>
          <img src={heart} alt="" />
        </div>
      </div>
      <div className="card-middle">
        <img src={heart} alt="" />
      </div>
      <div className="card-right">
        <div>
          <img src={heart} alt="" />
        </div>
        <div>
          <p>A</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Card;
