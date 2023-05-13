import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Skills.module.css";
import images from "../../assets";
// import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../index";
import { ChatAppContect } from "../../Context/ChatAppContext";

const Skills = ({
  functionName,
  loading,
  currentUserName,
  currentUserAddress,
  account,
}) => {
  //USE STATE
  const [message, setMessage] = useState("");
  const {  userName, userSkills, getSkills} = useContext(ChatAppContect);

  const router = useRouter();

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   setChatData(router.query);
    

  // }, [router.isReady]);

  useEffect(() => {
    // if (chatData.address) {
    //   readMessage(chatData.address);
    //   readUser(chatData.address);
    // }
    
    getSkills(account);
    console.log(userSkills);
  }, []);

  // function jobRedirect(param) {
  //   const router = useRouter();
  //   console.log(param);
  //   router.push({
  //     pathname: '/jobPage',
  //     query: { jobID: param },
  //   });
  // }

  // console.log(chatData.address, chatData.name);
  return (
    <div className={Style.Chat}>
      {/* {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" width={70} height={70} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )} */}
<h1>Skills</h1>
      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>Name</span>
</div>
{userSkills.map((el, i) => (
    <div key={i}>
  <div>
      <div style={{ margin: '1em 0', padding: '1em 0' }}>
        {/* <div onClick={() => jobRedirect(el[0])} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5em 0' }}> */}
        {el}
      </div>
      </div>
  </div>
))}
            
          </div>
        </div>

        {currentUserName && currentUserAddress ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image src={images.smile} alt="smile" width={50} height={50} />
              <input
                type="text"
                placeholder="type your message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <Image src={images.file} alt="file" width={50} height={50} />
              {loading == true ? (
                <Loader />
              ) : (
                <Image
                  src={images.send}
                  alt="file"
                  width={50}
                  height={50}
                  onClick={() =>
                    functionName({ msg: message, address: 0x0 })
                  }
                />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Skills;
