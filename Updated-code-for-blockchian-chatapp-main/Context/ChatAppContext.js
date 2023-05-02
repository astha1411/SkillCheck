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
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [yourJobs, setYourJobs] = useState([[[0x1f1441caca5066fc0ce926f5cdf4503597911ce84225aac3411c66d9b82d427c,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde1","Bombay","12,00,000INR","1 Total","1 Left",false,"C++"],[0x8c84ea25bf347081ae18db0d8789a8f3a12fc598631e4ed824ef6a117bbb94d0,0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2,"google","sde2","Delhi","15,00,000INR","2 Total","2 Left",false,"JS"]]]);
  const [applicants, setApplicants] = useState({
    jobIDs: [],
    userIDs: [],
    names: [],
    statuses: [],
    applicationIDs: [],
  });
  

  //CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

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
      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);
      //GET ROLE
      const role = await contract.getRole(connectAccount);
      setRole(role);
      //GET MY FRIEND LIST - disabled
      // const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);
      //GET ALL APP USER LIST - disabled
      // const userList = await contract.getAllAppUser();
      setUserLists(userList);
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
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      console.log("Currently You Have no Message");
    }
  };

  //CREATE ACCOUNT
  const createAccount = async ({ name, role }) => {
    console.log(name, account);
    try {
      if (!name || !account)
        return setError("Name And Account Address, cannot be empty");

      const contract = await connectingWithContract();
      console.log(contract);
      const getCreatedUser = await contract.createAccount(name, role);

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

  //READ INFO
  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
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

  //GET JOB (BY ID)
  
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

  return (
    <ChatAppContect.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        ChechIfWalletConnected,
        getJobs,
        addJob,
        account,
        userName,
        friendLists,
        friendMsg,
        userLists,
        loading,
        error,
        currentUserName,
        currentUserAddress,
        role,
        yourJobs
      }}
    >
      {children}
    </ChatAppContect.Provider>
  );
};
