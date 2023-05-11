import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./JobDetails.module.css";
import images from "../../assets";
import { ChatAppContect, } from "../../Context/ChatAppContext";
import { Model2 } from "../index";

const JobDetails = ({jobID}) => {
  // const { account, addFriends, yourJobs, addJob } = useContext(ChatAppContect);
  const { account, getJobs, yourJobs, addJob, getJobByID, jobDetails } = useContext(ChatAppContect);

  useEffect(() => {
    // if (chatData.address) {
    //   readMessage(chatData.address);
    //   readUser(chatData.address);
    // }
    getJobByID(jobID);
    console.log("details: "+jobDetails);
  }, []);

  //USESTATE
  // const [addFriend, setAddFriend] = useState(false);
  function handleAddFriendClick() {
    setAddFriend(true);
  }//const [job, setJob] = useState([0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde1","Bombay","12,00,000INR","1 Total","1 Left",false,"C++"]);
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
        <div>
      <p>Role: {jobDetails[3]}</p>
      <p>Pay: {jobDetails[5]}</p>
      <p>Vacancies: {jobDetails[6]}</p>
    </div>
        </div>
        {/* {console.log(yourJobs)}
        <div className={Style.Filter_box_right}>
          
          <button onClick={handleAddFriendClick} style={{ cursor: 'pointer' }}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD JOB
          </button>
        </div> */}
      </div>

      
    </div>
  );
};

export default JobDetails;
