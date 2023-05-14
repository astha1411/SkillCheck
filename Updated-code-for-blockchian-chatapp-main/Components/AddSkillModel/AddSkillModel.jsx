import React, { useState, useContext } from "react";
import Image from "next/image";
import { useRouter, router } from 'next/router';

//INTERNAL IMPORT
import Style from "./AddSkillModel.module.css";
import images from "../../assets";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Loader } from "../index";

const AddSkillModel = ({
  openBox,
  // title,
  address,
  head,
  // info,
  smallInfo,
  image,
  functionName,
  orgList
}) => {
  //USESTATE
  const [stMonth, setstMonth] = useState(1);
  const [stYear, setstYear] = useState(1);
  const [endMonth, setendMonth] = useState(2);
  const [endYear, setendYear] = useState(1);
  const [skill, setSkill] = useState("");
  // const [skillRequired, setSkillRequired] = useState([]);
  // const [userAddress, setUserAddress] = useState(address);
  const { loading,  } = useContext(ChatAppContect);

  const [org, setOrg] = useState("");
  const [orgAddress, setOrgAddress] = useState("");

  const handleOrgChange = (event) => {
    const selectedOrg = orgList[event.target.value];
    setOrg(selectedOrg[0]);
    setOrgAddress(selectedOrg[2]);
    console.log(typeof(orgAddress));
  };
  const handleSelect = (event) => {
    setSkill(event.target.value);
  };
  const handleButtonClick = () => {
    const skillParam = skill === 'C++' ? 'CPP' : skill;
    router.push(`/userTakeQuiz?skill=${skillParam}`);
  };

  
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
             <span>{head}</span>
          </h1>
          {console.log(orgList)}
          {/* <p>{info}</p> */}
          <small>{smallInfo}</small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.Model_box_right_name}>
               <div className={Style.Model_box_right_name_info}>
      <Image src={images.username} alt="user" width={30} height={30} />
      <select value={skill} onChange={handleSelect}>
        
          <option value="">Select the Skill</option>
          <option value="C++">C++</option>
          <option value="JS">JS</option>
          <option value="Python">Python</option>
          <option value="Kotlin">Kotlin</option>
          <option value="Java">Java</option>
        </select>
      
    </div>
              

              <div className={Style.Model_box_right_name_btn}>
                <button onClick={() => functionName({ orgID:orgAddress,orgName:org, stMonth, stYear, endMonth , endYear})}>
                  {""}
                  <Image src={images.send} alt="send" width={30} height={30} />
                  {""}
                  Add Certificate
                </button>

                <button onClick={handleButtonClick}>
                  {""}
                  <Image src={images.send} alt="send" width={30} height={30} />
                  {""}
                  Take Test
                </button>
                

                <button onClick={() => openBox(false)}>
                  {""}
                  <Image src={images.close} alt="send" width={30} height={30} />
                  {""}
                  Cancel
                </button>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSkillModel;
