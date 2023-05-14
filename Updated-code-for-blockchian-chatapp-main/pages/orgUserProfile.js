import React,{useContext} from 'react'
import { ChatAppContect } from "../Context/ChatAppContext";
import { useRouter } from 'next/router';
import { Skills, Experience, UserNavBar, UserProfileAdd } from '../Components/index'

const orgUserProfile = () => {
  // const {account} = useContext(ChatAppContect);
  const router = useRouter();
  const { userID } = router.query;
  console.log("userID from orgUserProf: "+userID);
  return (
    <div>
      <UserNavBar/>
      <Skills account={userID}/>
      <Experience account={userID}/>
    </div>
  )
}

export default orgUserProfile