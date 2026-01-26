// TODO: Card component
import React from "react";
import "../../styles/components/game/Card.css";
import heart from "../../assets/heart.png";
import diamond from "../../assets/diamond.png";
import spade from "../../assets/spade.png";
import club from "../../assets/club.png";

const Card = ({ num = 51 }) => {
  const type = Math.floor(num / 13);
  const val = num % 13;
  let img;
  const valueMap = [
    "A",
    "K",
    "Q",
    "J",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];
  const displayVal = valueMap[val];

  const isRed = type === 1 || type === 3;
  const colorClass = isRed ? "card-red" : "card-black";

  if (type === 0) {
    img = spade;
  } else if (type === 1) {
    img = heart;
  } else if (type === 2) {
    img = club;
  } else if (type == 3) {
    img = diamond;
  }
  return (
    <div className="card-parent">
      <div className="card-base">
        <div className="card-left">
          <div>
            <p className={colorClass}>{displayVal}</p>
          </div>
          <div>
            <img src={img} alt="" />
          </div>
        </div>
        <div className="card-middle">
          <img src={img} alt="" />
        </div>
        <div className="card-right">
          <div>
            <img src={img} alt="" />
          </div>
          <div>
            <p className={colorClass}>{displayVal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
