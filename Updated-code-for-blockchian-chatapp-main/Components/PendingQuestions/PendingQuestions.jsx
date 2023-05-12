import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./PendingQuestions.module.css";
import images from "../../assets";
// import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../index";
import { ChatAppContect } from "../../Context/ChatAppContext";

const PendingQuestions = ({
  functionName,
  loading,
  currentUserName,
  currentUserAddress,
  account
}) => {
  //USE STATE
  const [message, setMessage] = useState("");
  const {  role,userName, experiences, getExperiences, getQuestions2, skillQuestion, acceptQuestion, rejectQuestion} = useContext(ChatAppContect);

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

     getQuestions2();
    console.log("asdf: "+skillQuestion);
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
      <h1>Pending Questions</h1>
      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
          {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <span>Organisation</span>
  <span>Start</span>
  <span>End</span>
  <span>Status</span>
</div> */}

{skillQuestion.map((el, i) => (
  <div key={i}>
    <div>
      <div style={{ backgroundColor: '#191d26', borderRadius: '10px', margin: '10px', padding: '0px 10px 0 10px' ,display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p>{el[2]}</p>
          <p>{el[3]}</p>
          <button onClick={() =>acceptQuestion(el[0])}>Accept</button>
          <button onClick={() =>rejectQuestion(el[0])}>Reject</button>
        </div>
        <div>
          <p>{el[4]}</p>
          <p>{el[5]}</p>
          <p>{el[6]}</p>
          <p>{el[7]}</p>
          <p>ans: {el[8]}</p>
        </div>
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

export default PendingQuestions;
