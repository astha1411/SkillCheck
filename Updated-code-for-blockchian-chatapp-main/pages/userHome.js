import React,{useContext} from 'react'
import { ChatAppContect } from "../Context/ChatAppContext";
import { Skills, Experience, UserNavBar, UserProfileAdd } from '../Components/index'

const userHome = () => {
  const {account} = useContext(ChatAppContect);
  return (
    <div>
      <UserNavBar/>
      <UserProfileAdd/>
      <Skills account={account}/>
      <Experience account={account}/>
    </div>
  )
}

export default userHome