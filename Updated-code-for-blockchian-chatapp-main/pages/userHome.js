import React,{useContext, useEffect, useState} from 'react'
import { ChatAppContect } from "../Context/ChatAppContext";
import { Skills, Experience, UserNavBar, UserProfileAdd } from '../Components/index'

const userHome = () => {
  const {account} = useContext(ChatAppContect);
  const [role, setRole] = useState('false');

  useEffect(() => {
    // Get the value of `role` from the context and update the state variable
    setRole(context.role);
  }, [context.role]);

  console.log("userHomerole: "+role);

  return (
    <div>
      <UserNavBar/>
      {role === 'false' && <UserProfileAdd/>}
      <Skills account={account}/>
      <Experience account={account}/>
    </div>
  )
}


export default userHome