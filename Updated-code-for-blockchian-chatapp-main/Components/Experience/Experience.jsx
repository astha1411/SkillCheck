import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Experience.module.css";
import images from "../../assets";
// import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../index";
import { ChatAppContect } from "../../Context/ChatAppContext";

const Experience = ({
  functionName,
  loading,
  currentUserName,
  currentUserAddress,
  account
}) => {
  //USE STATE
  const [message, setMessage] = useState("");
  const {  role,userName, experiences, getExperiences} = useContext(ChatAppContect);

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

     getExperiences(account);
    console.log("asdf: "+experiences);
  }, [account]);

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
      
      <h1>Experiences</h1>
      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>Organisation</span>
  <span>Start</span>
  <span>End</span>
  <span>Status</span>
</div>
{experiences.map((el, i) => (
    <div key={i}>
  <div>
    
     <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>
      <p>{el[3]}</p>
      <p>{el[4]}/{el[5]}</p>
      <p>{el[6]}/{el[7]}</p>
      <p>{el[8]?"true":"false"}</p>
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

export default Experience;
