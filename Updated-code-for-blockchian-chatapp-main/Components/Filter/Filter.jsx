import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Filter.module.css";
import images from "../../assets";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model2 } from "../index";

const Filter = () => {
  const { account, addFriends, yourJobs, addJob } = useContext(ChatAppContect);

  //USESTATE
  const [addFriend, setAddFriend] = useState(false);
  function handleAddFriendClick() {
    setAddFriend(true);
  }
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
