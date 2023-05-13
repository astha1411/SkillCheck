import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./JobApplicants.module.css";
import images from "../../assets";
// import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../index";
import { ChatAppContect } from "../../Context/ChatAppContext";

const JobApplicants = ({
  functionName,
  loading,
  currentUserName,
  currentUserAddress,
  yourJobs,
  jobID,
  account
}) => {
  //USE STATE
  const [message, setMessage] = useState("");
  const [targetPage, setTargetPage] = useState('/');
  const { getApplicants, applicants,  rejectApplicant, selectApplicant } = useContext(ChatAppContect);

  const router = useRouter();

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   setChatData(router.query);
    

  // }, [router.isReady]);

  // const [_applicants, _setApplicants] = useState([]);

  useEffect(() => {
    getApplicants(jobID);
    console.log(applicants);
  }, []);
  
  // console.log("applicants2: ", applicants);
  
  
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
  <span>Name</span>
  <span>Status</span>
  <span>Decide</span>
  
</div>
<div style={{ width: '100%' }}>
{Object.values(applicants).filter(el => el[3] === "ongoing").map((el, index) => (
  <div key={index}>
    <Link href={{ pathname: '/orgUserProfile', query: { userID: el[1] } }}>
     <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>
      {console.log("aaa: "+typeof(el[1]))}
      <p>{el[2]}</p>
      <p>{el[3]}</p>
      <div className={Style.Model_box_right_name_btn} >
      <button onClick={() =>selectApplicant(el[4])}>Accept</button>
      <button onClick={() =>rejectApplicant(el[4])}>Reject</button>
        </div>
    </div>
    </Link>
  </div>
))}
</div>

            
          </div>
        </div>
        {/* {console.log("applicants list: " + JSON.stringify(applicants))} */}
        

     
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


export default JobApplicants;
// {JSON.parse(JSON.stringify(applicants)).map((el, i) => (
//   <div>
//     {
//     // ? (
//       <div style={{ margin: '1em 0', padding: '1em 0' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5em 0' }}>
          
//           <small>{(el[3])}</small>
//           <small>{(el[5])}</small>
//           <small>{(el[4])}</small>
//           <small>{(el[6])}</small>
//           <small>{(el[7])}</small>
         
//         </div>
//       </div>
//     // ) : 
//     // (
//       // <div className={Style.Chat_box_left_title}>
//       //   <Image
//       //     src={images.accountName}
//       //     alt="image"
//       //     width={50}
//       //     height={50}
//       //   />
//       //   <span>
//       //     {/* {userName} {""} */}
//       //     {/* <small>Time: {converTime(el.timestamp)}</small> */}
//       //   </span>
//       // </div>
//     // )
//     }
//     {/* <p key={i + 1}>
//       {el.msg}
//       {""}
//       {""}
//     </p> */}
//   </div>
// ))}