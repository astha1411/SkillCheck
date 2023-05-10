import React, { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router';

//INTERNAL IMPORT
import { ChatAppContect } from "../Context/ChatAppContext";

const ChatApp = () => {
  const router = useRouter();
  const {ChechIfWalletConnected, role} = useContext(ChatAppContect);
  useEffect(()=> {
    ChechIfWalletConnected();
    const targetPage = role ? '/orgHome' : '/orgHome';
    router.push(targetPage);
  }, [role, router]);
  // },[]);
  return (
    // <div>
    //   {console.log("user role is", role)}
    //   <Filter />
    //   <Friend />
    // </div>
    null
  );
};

export default ChatApp;
