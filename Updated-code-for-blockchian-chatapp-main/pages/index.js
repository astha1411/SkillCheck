import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import { ChatAppContect } from "../Context/ChatAppContext";
import { Filter, Friend } from "../Components/index";

const ChatApp = () => {
  const {ChechIfWalletConnected} = useContext(ChatAppContect);
  useEffect(()=> {
    ChechIfWalletConnected()
  },[]);
  return (
    <div>
      <Filter />
      <Friend />
    </div>
  );
};

export default ChatApp;
