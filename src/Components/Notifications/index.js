import React from "react";
import { Row } from "react-bootstrap";
import ApplicationStatus from "./ApplicationStatus";
//import styles from "../style/style.module.css";
const Job = {
  company: {
    logo: "../../Asset/images/companylogo.png",
    name: "Microsoft",
  },
  title: "Backend Developer",
  jobid: 21982,
  location: "Mumbai",
  status: "Under Consideration",
  datesubmitted: "20th Oct 2022",
};

const Notifications = () => {
  return (
    <>
      <Row>
        <ApplicationStatus Job={Job} />
      </Row>
    </>
  );
};

export default Notifications;
