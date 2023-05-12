import React, { useState, useEffect, useContext } from "react";
//INTRNAL IMPORT
import { UserCard, NavBar, Applicants } from "../Components/index";
import Style from "../styles/pastExperiences.module.css";
import { ChatAppContect } from "../Context/ChatAppContext";


const pastExperiences = () => {
  //const { userLists, addFriends } = useContext(ChatAppContect);
  const { userLists } = useContext(ChatAppContect);
  return (
    <div>
      <NavBar />
      <div className={Style.alluser_info}>
        <h1>Verify Past Experiences </h1>
      </div>
<Applicants />
      {/* <div className={Style.alluser}>
        {userLists[0].map((el, i) => {
          console.log(el);
          return <UserCard key={i + 1} el={el} i={i} />
          // <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
          
          })}
      </div> */}
    </div>
  );
};

export default pastExperiences;
