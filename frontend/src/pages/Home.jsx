//Home.jsx
import React, { useState } from "react";
import Invitations from "../components/home/Invitations";
import Room from "../components/home/Room";
import Navbar from "../components/home/Navbar";
import "../styles/pages/Home.css";
import RoomPass from "./RoomPass";
import Lobby from "./Lobby";

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="main-home">
        <div className="show-nav">
          {(activeTab === 0 || activeTab === 1 || activeTab === 2) && (
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          )}
        </div>
        <div className="show-page">
          {activeTab === 0 && <Invitations key={"0"} />}
          {activeTab === 1 && <Room key={"1"} type="create" setActiveTab={setActiveTab} />}
          {activeTab === 2 && <Room key={"2"} type="join" setActiveTab={setActiveTab} />}
          {activeTab === 3 && <RoomPass key={"3"} type="passRequired" />}
          {activeTab === 4 && <Lobby key={"4"} type="lobby" />}
        </div>
      </div>
    </>
  );
};

export default Home;
