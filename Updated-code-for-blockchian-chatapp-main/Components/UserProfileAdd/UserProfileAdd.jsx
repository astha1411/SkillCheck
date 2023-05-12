import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./UserProfileAdd.module.css";
import images from "../../assets";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { AddExperienceModel, AddSkillModel } from "../index";

const UserProfileAdd = () => {
  // const { account, addFriends, yourJobs, addJob } = useContext(ChatAppContect);
  const { account, getJobs, yourJobs, addExperience2, getOrgList, orgList, getSkills,userSkills, addSkill } = useContext(ChatAppContect);

  useEffect(() => {
    // if (chatData.address) {
    //   readMessage(chatData.address);
    //   readUser(chatData.address);
    // }
    getSkills(account);
    console.log(userSkills);
    getJobs();
    getOrgList();
    // console.log(yourJobs);
  }, []);

  //USESTATE
  const [_addExperience, _setAddExperience] = useState(false);
  const [_addSkill, _setAddSkill] = useState(false);
  // const [addExperience, setAddExperience] = useState(false);
  function handleAddExperienceClick() {
    _setAddExperience(true);
  }//const [job, setJob] = useState([0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde1","Bombay","12,00,000INR","1 Total","1 Left",false,"C++"]);
  function handleAddSkillClick() {
    _setAddSkill(true);
  }
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box_right}>
      <button onClick={handleAddSkillClick} style={{ cursor: 'pointer' }}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD SKILL
          </button>
        {/* {console.log(yourJobs)} */}
        <div className={Style.Filter_box_right}>
          
          <button onClick={handleAddExperienceClick} style={{ cursor: 'pointer' }}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD EXPERIENCE
          </button>
        </div>
      </div>

      {/* //MODEL COMPONENT */}
      {_addExperience && (
        <div className={Style.Filter_model}>
          <AddExperienceModel
            openBox={_setAddExperience}
            // title="WELCOME TO"
            head="ADD EXPERIENCE"
            // info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
            smallInfo="Enter Experience Details"
            image={images.hero}
            functionName={addExperience2}
            orgList={orgList}
          />
        </div>
      )}

{_addSkill && (
        <div className={Style.Filter_model}>
          <AddSkillModel
            openBox={_setAddSkill}
            // title="WELCOME TO"
            head="ADD SKILL"
            // info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
            smallInfo="Enter Experience Details"
            image={images.hero}
            functionName={addExperience2}
            orgList={orgList}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfileAdd;
