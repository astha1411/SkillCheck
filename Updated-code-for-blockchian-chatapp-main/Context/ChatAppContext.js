import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import {
  ChechIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "../Utils/apiFeature";

export const ChatAppContect = React.createContext();

export const ChatAppProvider = ({ children }) => {

  //STATE VARIABLES. EITHER STRUCTS, DATA TYPES OR ARRAYS FROM CHATAPP.SOL
  //USESTATE
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  // const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([[[0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde1","Bombay","12,00,000INR","1 Total","1 Left",true,"C++"],[0x8c84ea25bf347081ae18db0d8789a8f3a12fc598631e4ed824ef6a117bbb94d0,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde2","Delhi","15,00,000INR","2 Total","2 Left",false,"JS"]]]);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [yourJobs, setYourJobs] = useState([[[0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde1","Bombay","12,00,000INR","1 Total","1 Left",false,"C++"],[0x8c84ea25bf347081ae18db0d8789a8f3a12fc598631e4ed824ef6a117bbb94d0,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde2","Delhi","15,00,000INR","2 Total","2 Left",false,"JS"]]]);
  const [allJobs, setAllJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [applicants, setApplicants] = useState(
    {
    jobIDs: [0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c],
    userIDs: [0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db,0x617F2E2fD72FD9D5503197092aC168c91465E7f2,0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB,0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db],
    names: ["Krutin","Apurv","Akshad","Krutin"],
    statuses: ["ongoing","ongoing","ongoing","ongoing"],
    applicationIDs: [0xc25548d6895002141bfdf14576245b332750d4f934e552c3525e8c8938047f3b,0x9390c98c523b0ed9d84414014c97a62f03b2866535a70a9c1383bec86ee94eb3,0x9e6077cd4a21cfd917c1ba980c0ef818821b1fa159c4c329d8e319d2e61b4445,0xc25548d6895002141bfdf14576245b332750d4f934e552c3525e8c8938047f3b],
  }
  );
  const [userSkills, setUserSkills] = useState(["C++","Python"]);
  const [experiences, setExperiences] = useState([[0x37798412b19af53521dfc19ea63ca3b09c2a0e28850532f49fa754ed26cd8ee4,0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,"google",1,20,2,21,false],[0x2ba006edf58322e6250f2688e123c59e21d1d4b46df52e649280336faea478f3,0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"amazon",4,21,5,22,false]]);
  const [orgList, setOrgList] = useState([]);
  const [pendingExperiences, setPendingExperiences] = useState([]);
  const [anyUser, setAnyUser] = useState("");
  //CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");
  const [skillQuestion, setskillQuestion] = useState([[0xa0ff94b0fbe78a79eda563026411f7a2b720fe3dc1ac34eb61283f3648bcd707,0xfd4dff033d528f6f7fe2d809c3bd173e484cfdf843d8830721cf8b325585ca74,"C++","ajwdlfnm","cat","dog","cow","horse",1],[0x3cfb0d0f199b99f4f4c4687ac81736ed4f785838861e161e521ab584b6e61592,0x4ea15e403cd349f9db2f7ef9f1919f2a3d9673915a77591bc95627e6f2885a1a,'Python','afafgDFD','red','blue',"yellow","green",2]]);
  const [skillQuiz, setSkillQuiz] = useState([["ajwdlfnm","cat","dog","cow","horse",1],['afafgDFD','red','blue',"yellow","green",2]]);
  const router = useRouter();

  //FETCH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      //GET CONTRACT
      const contract = await connectingWithContract();
      //GET ACCOUNT
      const connectAccount = await connectWallet();//connect wallet returns an account type
      setAccount(connectAccount);
      //GET USER NAME
      const userName = await contract.getUsername2(connectAccount);
      setUserName(userName);
      //GET ROLE
      const role = await contract.getRole2(connectAccount);
      setRole(role);
      //GET MY FRIEND LIST - disabled
      // const friendLists = await contract.getMyFriendList();
      // setFriendLists(friendLists);
      //GET ALL APP USER LIST - disabled
      // const userList = await contract.getAllAppUser();
      // setUserLists(userList);
      // contract.createAccount2
      console.log('ChatAppContext👍');
      // console.log(role);
      // console.log(currentUserAddress);
    } catch (error) {
      // setError("Please Install And Connect Your Wallet");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //READ MESSAGE
  // const readMessage = async (friendAddress) => {
  //   try {
  //     const contract = await connectingWithContract();
  //     const read = await contract.readMessage(friendAddress);
  //     setFriendMsg(read);
  //   } catch (error) {
  //     console.log("Currently You Have no Message");
  //   }
  // };

  //CREATE ACCOUNT
  const createAccount = async ({ name, role }) => {
    console.log(name, account);
    try {
      if (!name || !account)
        return setError("Name And Account Address, cannot be empty");

      const contract = await connectingWithContract();
      console.log(contract);
      const getCreatedUser = await contract.createAccount2(name, role);

      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      console.log(name);
      window.location.reload();
    } catch (error) {
      setError("Error while creating your account Pleas reload browser");
    }
  };

  //ADD YOUR FRIENDS
  const addFriends = async ({ name, userAddress }) => {
    try {
      if (!name || !userAddress) return setError("Please provide data");
      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(userAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went wrong while adding friends, try again");
    }
  };

  //SEND MESSAGE TO YOUR FRIEND
  const sendMessage = async ({ msg, address }) => {
    console.log(msg, address);
    try {
      if (!msg || !address) return setError("Please Type your Message");

      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };

  //READ USER (GETUSERNAME2)
  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername2(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };
  //READ ANY USER (GETUSERNAME2)
  const readAnyUser = async (address) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername2(address);
    setAnyUser(userName);
    // setCurrentUserAddress(userAddress);
  };

  //GET YOUR JOBS
  const getJobs = async () => {
    try {
      const contract = await connectingWithContract();
      const _yourJobs = await contract.getJobs();
      setYourJobs(_yourJobs);
    } catch (error) {
      console.log("No Jobs Posted Yet");
    }
  }

  //ADD JOB
  const addJob = async ({role, location, _package, openingsTotal, skillRequired}) =>{
    console.log(role, location, _package, openingsTotal, skillRequired);
    try {
      if (!role || !location) return setError("Enter Details Please");

      const contract = await connectingWithContract();
      const addMessage = await contract.addJob(role, location, _package, openingsTotal, skillRequired);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  }

  //GET ALL JOBS
  const getAllJobs = async () => {
    try {
      const contract = await connectingWithContract();
      const _allJobIDs = await contract.getAllJobIDs();
      const _allJobs = await contract.getAllJobs(_allJobIDs);
      setAllJobs(_allJobs);
    } catch (error) {
      console.log("No Jobs Posted Yet");
    }
  }
  //GET JOB (BY ID)
  const getJobByID = async (jobID) => {
    try {
      const contract = await connectingWithContract();
      const _jobDetails = await contract.getJobDetails(jobID);
      setJobDetails(_jobDetails);
    } catch (error) {
      console.log("No Jobs Posted Yet");
    }
  }

  //GET APPLICANTS
  const getApplicants = async (jobID) => {
    try {
      const contract = await connectingWithContract();
      const _applicants = await contract.getApplicants(jobID);
      setApplicants({
        jobIDs: _applicants[0],
        userIDs: _applicants[1],
        names: _applicants[2],
        statuses: _applicants[3],
        applicationIDs: _applicants[4],
      });
    } catch (error) {
      console.log("No Applicants Applied Yet");
    }
  }

  //SELECT APPLICANTS
  const selectApplicant = async (applicationID) => {
    try {
      const contract = await connectingWithContract();
      const selecting = await contract.selectApplicant(applicationID);
      setLoading(true);
      await selecting.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };

  //REJECT APPLICANTS
  const rejectApplicant = async (applicationID) => {
    try {
      const contract = await connectingWithContract();
      const rejecting = await contract.selectApplicant(applicationID);
      setLoading(true);
      await rejecting.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };

  //GET USER SKILLS
  const getSkills = async (address) => {
    try {
      const contract = await connectingWithContract();
      const _skills = await contract.getUserSkillList(address);
      setUserSkills(_skills);
    } catch (error) {
      console.log("No Skills Yet");
    }
  }

  //GET USER EXPERIENCES
  const getExperiences = async (address) => {
    try {
      const contract = await connectingWithContract();
      const _experiences = await contract.getUserExperiences(address);
      
      const updatedExperiences = _experiences.map(exp => {
        const updatedExp = [...exp];
        updatedExp[4] = updatedExp[4].toString();
        updatedExp[5] = updatedExp[5].toString();
        updatedExp[6] = updatedExp[6].toString();
        updatedExp[7] = updatedExp[7].toString();
        return updatedExp;
      });

      setExperiences(updatedExperiences);
      // console.log("getExp: "+updatedExperiences);
    } catch (error) {
      console.log("No Experience Yet");
    }
  }

  //ADD EXPERIENCE
  const addExperience2 = async ({orgID, orgName, stMonth, stYear, endMonth , endYear}) =>{
    try {
      console.log(orgID, orgName, stMonth, stYear, endMonth , endYear);
      // if (!role || !location) return setError("Enter Details Please");

      const contract = await connectingWithContract();
      const _exp = await contract.addExperience(orgID, orgName, stMonth, stYear, endMonth , endYear);
      setLoading(true);
      await _exp.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      setError("Please reload and try again");
    }
  }

  //GET ORG LIST
  const getOrgList = async () => {
    try {
      const contract = await connectingWithContract();
      const _orgList = await contract.getOrgList();
      setOrgList(_orgList);
    } catch (error) {
      console.log("No Organisations Created Yet");
    }
  }

  //ADD SKILL
  const addSkill = async (skills) =>{
    try {
      console.log(skills);
      // if (!role || !location) return setError("Enter Details Please");

      const contract = await connectingWithContract();
      const _skills = await contract.addSkills(skills);
      setLoading(true);
      await _skills.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      // console.log(error);
      setError("Please reload and try again");
    }
  }

  //GET PENDING EXPERIENCES
  const getPendingExperiences = async () => {
    try {
      const contract = await connectingWithContract();
      const _pendingExpList = await contract.getOrgPendingExperiences();
      setPendingExperiences(_pendingExpList);
    } catch (error) {
      console.log("No Organisations Created Yet");
    }
  }

  //REJECT EXPERIENCE
  const rejectExperience = async (expID) => {
    try {
      const contract = await connectingWithContract();
      const rejecting = await contract.rejectExp(expID);
      setLoading(true);
      await rejecting.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };
  //SELECT EXPERIENCE
  const selectExperience = async (expID) => {
    try {
      const contract = await connectingWithContract();
      const selecting = await contract.verifyExp(expID);
      setLoading(true);
      await selecting.wait();
      console.log("selected");
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
    }
  };
//ADD QUESTIONS
const addQuestions = async ({questionLine, option1, option2, option3, option4, answer, skill}) =>{
  try {
    console.log("addQuestion: "+questionLine, option1, option2, option3, option4, answer, skill);
    // if (!role || !location) return setError("Enter Details Please");

    const contract = await connectingWithContract();
    const _ques = await contract.addQuestion(questionLine, option1, option2, option3, option4, answer, skill);
    setLoading(true);
    await _ques.wait();
    setLoading(false);
    window.location.reload();
  } catch (error) {
    console.log(error);
    setError("Please reload and try again");
  }
}
//GET QUESTIONs
const getQuestions2 = async () =>{
  try {
    // if (!role || !location) return setError("Enter Details Please");

    const contract = await connectingWithContract();
    const _skillQuestion = await contract.viewPendingApprovals();
    setskillQuestion(_skillQuestion);
  } catch (error) {
    console.log(error);
    setError("Please reload and try again");
  }
}
//ACCEPT QUESTION
const acceptQuestion = async (proposedQuestionID) => {
  try {
    const contract = await connectingWithContract();
    const accepting = await contract.acceptProposedQuestion(proposedQuestionID);
    setLoading(true);
    await accepting.wait();
    console.log("accepting");
    setLoading(false);
    window.location.reload();
  } catch (error) {
    setError("Please reload and try again");
  }
};
//REJECT QUESTION
const rejectQuestion = async (proposedQuestionID) => {
  try {
    const contract = await connectingWithContract();
    const rejecting = await contract.rejectProposedQuestion(proposedQuestionID);
    setLoading(true);
    await rejecting.wait();
    setLoading(false);
    console.log(proposedQuestionID);
    window.location.reload();
  } catch (error) {
    console.log(error);
    setError("Please reload and try again");
  }
};

//VIEW QUIZ BY SKILL
const getQuestionBySkill = async (skill) => {
  try {
    // console.log("quizSkill: "+skill);
    const contract = await connectingWithContract();
    const _skillQuiz = await contract.getQuestions(skill);
    setSkillQuiz(_skillQuiz);
    console.log("skillQuiz: "+_skillQuiz);
  } catch (error) {
    console.log(error);
    console.log("No Questions for Given Quiz Yet");
  }
}

  return (
    <ChatAppContect.Provider
      value={{
        // readMessage,
        createAccount,
        // addFriends,
        sendMessage,
        readUser,
        connectWallet,
        ChechIfWalletConnected,
        getJobs,
        addJob,
        getAllJobs,
        getJobByID,
        getApplicants,
        selectApplicant,
        rejectApplicant,
        getSkills,
        getExperiences,
        addExperience2,
        getOrgList,
        addSkill,
        getPendingExperiences,
        readAnyUser,
        rejectExperience,
        selectExperience,
        addQuestions,
        getQuestions2,
        acceptQuestion,
        rejectQuestion,
        getQuestionBySkill,
        account,
        userName,
        // friendLists,
        friendMsg,
        userLists,
        loading,
        error,
        currentUserName,
        currentUserAddress,
        role,
        yourJobs,
        applicants,
        allJobs,
        jobDetails,
        userSkills,
        experiences,
        orgList,
        pendingExperiences,
        anyUser,
        skillQuestion,
        skillQuiz
      }}
    >
      {children}
    </ChatAppContect.Provider>
  );
};
