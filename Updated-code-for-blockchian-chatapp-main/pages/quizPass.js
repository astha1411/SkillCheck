import React,{useContext} from 'react'
import { ChatAppContect } from "../Context/ChatAppContext";
import { Skills, Experience, UserNavBar, UserProfileAdd } from '../Components/index'

const quizPass = () => {
  const {account} = useContext(ChatAppContect);
  return (
    <div>
      <UserNavBar/>
      <h1>Congratulations!</h1>
      <h2>Skill Added</h2>
    </div>
  )
}

export default quizPass