import React, { useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Model2.module.css";
import images from "../../assets";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Loader } from "../index";

const Model2 = ({
  openBox,
  title,
  address,
  head,
  info,
  smallInfo,
  image,
  functionName,
}) => {
  //USESTATE
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [_package, set_package] = useState("");
  const [openingsTotal, setOpeningsTotal] = useState(0);
  const [skillRequired, setSkillRequired] = useState([]);
  // const [userAddress, setUserAddress] = useState(address);

  

  const { loading } = useContext(ChatAppContect);

  function onSkillsChange(event) {
    const inputValue = event.target.value;
    const arrayFromString = inputValue.split(',');
    setSkillRequired(arrayFromString);
  }
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>
            {title} <span>{head}</span>
          </h1>
          <p>{info}</p>
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
                  placeholder="Role"
                  onChange={(e) => setRole(e.target.value)}
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
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
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
                  placeholder="Package"
                  onChange={(e) => set_package(e.target.value)}
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
                  type="number"
                  placeholder="Openings"
                  onChange={(e) => setOpeningsTotal(e.target.value)}
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
                  placeholder="Skills Required (Comma Separated)"
                  value={skillRequired.join(',')}
                  onChange={onSkillsChange}
                  
                />

              </div>
              
              

              <div className={Style.Model_box_right_name_btn}>
                <button onClick={() => functionName({ role, location, _package, openingsTotal, skillRequired})}>
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

export default Model2;
