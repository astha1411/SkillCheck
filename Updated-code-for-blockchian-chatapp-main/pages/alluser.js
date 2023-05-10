import React, { useState, useEffect, useContext } from "react";
//INTRNAL IMPORT
import { UserCard } from "../Components/index";
import Style from "../styles/alluser.module.css";
import { ChatAppContect } from "../Context/ChatAppContext";

const alluser = () => {
  //const { userLists, addFriends } = useContext(ChatAppContect);
  const { userLists } = useContext(ChatAppContect);
  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>Verify Past Experiences </h1>
      </div>

      <div className={Style.alluser}>
        {userLists[0].map((el, i) => {
          console.log(el);
          return <UserCard key={i + 1} el={el} i={i} />
          // <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
          
          })}
      </div>
    </div>
  );
};

export default alluser;
