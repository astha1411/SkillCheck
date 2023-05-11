import React, { useContext } from "react";
import { useRouter } from 'next/router';
//INTERNAL IMPORT
import { ChatAppContect } from "../Context/ChatAppContext";
import { Applicants, JobDetails, NavBar } from "../Components/index";

const JobPage = () => {
    const router = useRouter();
    const { jobID } = router.query;
  
    const { role } = useContext(ChatAppContect);
    return (
      <div>
        {console.log("role: " + role)}
        {console.log(jobID)}
        <NavBar />
        <JobDetails jobID={jobID}/>
        <Applicants jobID={jobID}/>
    </div>
  )
}

export default JobPage