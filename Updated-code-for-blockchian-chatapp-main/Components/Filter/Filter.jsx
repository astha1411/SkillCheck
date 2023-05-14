import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Filter.module.css";
import images from "../../assets";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model2 } from "../index";

const Filter = () => {
  // const { account, addFriends, yourJobs, addJob } = useContext(ChatAppContect);
  const { account, getJobs, yourJobs, addJob } = useContext(ChatAppContect);

  useEffect(() => {
    // if (chatData.address) {
    //   readMessage(chatData.address);
    //   readUser(chatData.address);
    // }
    getJobs();
    console.log(yourJobs);
  }, []);

  //USESTATE
  const [addFriend, setAddFriend] = useState(false);
  function handleAddFriendClick() {
    setAddFriend(true);
  }//const [job, setJob] = useState([0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde1","Bombay","12,00,000INR","1 Total","1 Left",false,"C++"]);
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter}>
            
            YOUR JOBS
          </div>
        </div>
        {console.log(yourJobs)}
        <div className={Style.Filter_box_right}>
          
          <button onClick={handleAddFriendClick} style={{ cursor: 'pointer' }}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD JOB
          </button>
        </div>
      </div>

      {/* //MODEL COMPONENT */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model2
            openBox={setAddFriend}
            // title="WELCOME TO"
            head="ADD JOB"
            // info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
            smallInfo="Enter Job Details"
            image={images.hero}
            functionName={addJob}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
