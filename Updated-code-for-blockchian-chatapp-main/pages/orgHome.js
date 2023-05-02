import React, { useEffect, useState, useContext } from "react";
//INTERNAL IMPORT
import { ChatAppContect } from "../Context/ChatAppContext";
import { Filter, Friend } from "../Components/index";

const orgHome = () => {
  return (
    <div>
      {console.log("orgHome page")}
      <Filter />
      <Friend />
    </div>
  )
}

export default orgHome