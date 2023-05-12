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
  
  loading,
  currentUserName,
  currentUserAddress,
  
}) => {
    const { getAllJobs, allJobs, applyToJob } = useContext(ChatAppContect);
  //USE STATE
  const [message, setMessage] = useState("");
  // const [targetPage, setTargetPage] = useState('/');
  // const [job, setJob] = useState([0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde1","Bombay","12,00,000INR","1 Total","1 Left",false,"C++"]);
//   const [applicants, getApplicants] = useState([]);
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
    getAllJobs();
    console.log("useEffect AllJob: "+allJobs);
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
    <span>Role</span>
    <span>Location</span>
    <span>Compensation</span>
    <span>Vacancies</span>
    <span>Skills</span>
    <span>Action</span>
  </div>
  {/* {console.log(typeof applicants)} */}
  
</div>
{allJobs.map((el, i) => (
                
                <div key={i}>
                <div style={{ margin: '1em 0', padding: '1em 0' }} >
                  {/* <div onClick={() => jobRedirect(el[0])} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5em 0' }}> */}
                  {/* <Link href={{ pathname: '/jobPage', query: { jobID: el[0] } }}> */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.5em 0' }}>
                    <small>{(el[2])}</small>
                    <small>{(el[3])}</small>
                    <small>{(el[4])}</small>
                    <small>{(el[5])}</small>
                    <small>{(el[7])}</small>
                    <small>{(el[9])}</small>
                    <button onClick={() => applyToJob(el[0])}>Apply</button>
                  </div>
                  {/* </Link> */}
                </div>
                </div>
              
          ))}
          {console.log("allJobs: "+allJobs)}
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

export default JobPage;
// {applicantsArray.map((applicant) => (
//       <div key={applicant[0]}>
//         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//           <span>{applicant[2]}</span>
//           <span>C++</span>
//           <span>{applicant[3]}</span>
//         </div>
//       </div>
//     ))}