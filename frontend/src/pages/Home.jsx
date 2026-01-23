//Home.jsx
import React, { useEffect, useState } from "react";
import Invitations from "../components/home/Invitations";
import Room from "../components/home/Room";
import Navbar from "../components/home/Navbar";
import "../styles/pages/Home.css";
import RoomPass from "./RoomPass";
import Lobby from "./Lobby";

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currRoomId, setCurrRoomId] = useState("");

  useEffect(() => {
    const savedRoomId = localStorage.getItem("roomId");
    if (savedRoomId) {
      setCurrRoomId(savedRoomId);
      setActiveTab(4);
    }
  }, []);

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
          {activeTab === 1 && (
            <Room
              key={"1"}
              type="create"
              setActiveTab={setActiveTab}
              setCurrRoomId={setCurrRoomId}
            />
          )}
          {activeTab === 2 && (
            <Room
              key={"2"}
              type="join"
              setActiveTab={setActiveTab}
              setCurrRoomId={setCurrRoomId}
            />
          )}
          {activeTab === 3 && (
            <RoomPass
              key={"3"}
              type="passRequired"
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === 4 && (
            <Lobby
              key={"4"}
              type="lobby"
              setActiveTab={setActiveTab}
              roomId={currRoomId}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
