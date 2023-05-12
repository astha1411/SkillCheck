import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./AddQuestionModel.module.css";
import images from "../../assets";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Loader } from "../index";

const AddQuestionModel = ({
  openBox,
  // title,
  address,
  head,
  // info,
  smallInfo,
  image,
  functionName,
}) => {
  //USESTATE
  const [_question, _setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [ans, setAns] = useState(0);
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
  const handleSelect2 = (event) => {
    setAns(event.target.value);
  };


  
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
             {/* <span>{head}</span> */}
          </h1>
          {/* {console.log(orgList)} */}
          {/* <p>{info}</p> */}
          <small>{smallInfo}</small>

          {loading == true ? (
            <Loader />
          ) : (
            <div className={Style.Model_box_right_name}>
               <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="Question"
                  onChange={(e) => _setQuestion(e.target.value)}
                />

              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="Option 1"
                  onChange={(e) => setOption1(e.target.value)}
                />

              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="Option 2"
                  onChange={(e) => setOption2(e.target.value)}
                />

              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="Option 3"
                  onChange={(e) => setOption3(e.target.value)}
                />

              </div>
              <div className={Style.Model_box_right_name_info}>
                <Image
                  src={images.username}
                  alt="user"
                  width={30}
                  height={30}
                />
                <input
                  type="text"
                  placeholder="Option 4"
                  onChange={(e) => setOption4(e.target.value)}
                />

              </div>     
              <div className={Style.Model_box_right_name_info}>
      <Image src={images.username} alt="user" width={30} height={30} />
      <select value={ans} onChange={handleSelect2}>
          <option value="">Select the Answer</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      
    </div>         
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
                {/* <button onClick={() => functionName({ orgID:orgAddress,orgName:org, stMonth, stYear, endMonth , endYear})}> */}
                <button onClick={() => {functionName({ questionLine:_question, option1, option2, option3, option4, answer:ans, skill});console.log("qq: "+ans);}}>
                  {""}
                  <Image src={images.send} alt="send" width={30} height={30} />
                  {""}
                  Submit
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

export default AddQuestionModel;
