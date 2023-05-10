import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Friend.module.css";
import images from "../../assets";
import Card from "./Card/Card";
import Chat from "./Chat/Chat";
import { ChatAppContect } from "../../Context/ChatAppContext";

const Friend = () => {
  // const array = [1, 2, 34, 5, 6];/

  const {
    sendMessage,
    account,
    // friendLists,
    // readMessage,
    userName,
    loading,
    friendMsg,
    currentUserName,
    currentUserAddress,
    readUser,
    yourJobs
  } = useContext(ChatAppContect);

  return (
    <div className={Style.Friend}>
      <div>
        {/* <div className={Style.Friend_box_left}>
          {friendLists.map((el, i) => (
            <Card
              key={i + 1}
              el={el}
              i={i}
              readMessage={readMessage}
              readUser={readUser}
            />
          ))}
        </div> */}
        <div >
          <Chat
            functionName={sendMessage}
            // readMessage={readMessage}
            friendMsg={friendMsg}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
            readUser={readUser}
            yourJobs ={yourJobs}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
