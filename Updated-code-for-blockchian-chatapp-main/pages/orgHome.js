import React, { useContext } from "react";
//INTERNAL IMPORT
import { ChatAppContect } from "../Context/ChatAppContext";
import { Filter, Friend, NavBar } from "../Components/index";

const orgHome = () => {
  const {role} = useContext(ChatAppContect);
  return (
    <div>
      {console.log("role: "+role)}
      <NavBar />
      <Filter />
      <Friend />
    </div>
  )
}

export default orgHome