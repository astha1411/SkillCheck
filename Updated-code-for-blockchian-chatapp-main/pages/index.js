import React, { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router';

//INTERNAL IMPORT
import { ChatAppContect } from "../Context/ChatAppContext";

const ChatApp = () => {
  const router = useRouter();
  const {ChechIfWalletConnected, role} = useContext(ChatAppContect);
  useEffect(()=> {
    async function fetchData() {
      
      await ChechIfWalletConnected();
      console.log("roleIndex: "+role);
      const targetPage = role ? '/orgHome' : '/orgHome';
      router.push(targetPage);
    }
    fetchData();
  
  }, [role, router]);
  // },[]);
  return (
    null
  );
};

export default ChatApp;
