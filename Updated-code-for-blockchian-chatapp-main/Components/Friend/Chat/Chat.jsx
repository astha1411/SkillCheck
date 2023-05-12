import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./Chat.module.css";
import images from "../../../assets";
// import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../../index";

const Chat = ({
  functionName,
  // readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
  yourJobs
}) => {
  //USE STATE
  const [message, setMessage] = useState("");
  const [targetPage, setTargetPage] = useState('/');
  

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
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image src={images.accountName} alt="image" width={70} height={70} />
          <div className={Style.Chat_user_info_box}>
            <h4>{currentUserName}</h4>
            <p className={Style.show}>{currentUserAddress}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>Role</span>
  <span>Pay</span>
  <span>Location</span>
  <span>Openings</span>
  <span>Vacancies</span>
</div>

            {yourJobs.map((el, i) => (
                
                  <div key={i}>
                  <div style={{ margin: '1em 0', padding: '1em 0' }} >
                    {/* <div onClick={() => jobRedirect(el[0])} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5em 0' }}> */}
                    <Link href={{ pathname: '/jobPage', query: { jobID: el[0] } }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5em 0' }}>
                      <small>{(el[3])}</small>
                      <small>{(el[5])}</small>
                      <small>{(el[4])}</small>
                      <small>{(el[6])}</small>
                      <small>{(el[7])}</small>
                     
                    </div>
                    </Link>
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

export default Chat;
