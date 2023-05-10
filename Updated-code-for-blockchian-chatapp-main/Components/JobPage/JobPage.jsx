import React, { useEffect, useState , useContext} from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./JobPage.module.css";
import images from "../../assets";
// import { converTime } from "../../../Utils/apiFeature";
import { Loader } from "../index";
import { ChatAppContect } from "../../Context/ChatAppContext";

const JobPage = ({
  functionName,
//   readMessage,
  friendMsg,
  account,
  userName,
  loading,
  currentUserName,
  currentUserAddress,
  readUser,
  yourJobs,
  jobID
}) => {
    const { applicants } = useContext(ChatAppContect);
  //USE STATE
  const [message, setMessage] = useState("");
  const [targetPage, setTargetPage] = useState('/');
  const [job, setJob] = useState([0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde1","Bombay","12,00,000INR","1 Total","1 Left",false,"C++"]);
//   const [applicants, getApplicants] = useState([]);
  const router = useRouter();
  console.log(applicants);
  const applicantsArray = Object.values(applicants);

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

  async function jobRedirect(param) {
    // Do something when the button is clicked
    console.log(param);
  }

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
          
<div style={{ display: 'flex', flexDirection: 'column' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>Name</span>
    <span>Skills</span>
    <span>Action</span>
  </div>
  {/* {console.log(typeof applicants)} */}
  {applicantsArray.map((applicant) => (
      <div key={applicant[0]}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{applicant[2]}</span>
          <span>C++</span>
          <span>{applicant[3]}</span>
        </div>
      </div>
    ))}
</div>
          
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
//   {yourJobs[0].map((el, i) => (
//     <div>
//       {
//       // ? (
//         <div style={{ margin: '1em 0', padding: '1em 0' }}>
//           <div onClick={() => jobRedirect(el[0])} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5em 0' }}>
            
//             <small>{(el[3])}</small>
//             <small>{(el[5])}</small>
//             <small>{(el[4])}</small>
//           </div>
//         </div>
//       // ) : 
//       // (
//         // <div className={Style.Chat_box_left_title}>
//         //   <Image
//         //     src={images.accountName}
//         //     alt="image"
//         //     width={50}
//         //     height={50}
//         //   />
//         //   <span>
//         //     {/* {userName} {""} */}
//         //     {/* <small>Time: {converTime(el.timestamp)}</small> */}
//         //   </span>
//         // </div>
//       // )
//       }
//       {/* <p key={i + 1}>
//         {el.msg}
//         {""}
//         {""}
//       </p> */}
//     </div>
//   ))}
};

export default JobPage;
