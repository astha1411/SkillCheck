import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import styles from "./style/style.module.css";
import Rows from "./row";

const detailsarr = [
  {
    id: 1,
    company: {
      logo: "../../Asset/images/companylogo.png",
      name: "PhonePe",
    },
    title: "Java Lead",
    jobid: 17878,
    location: "Bangalore",
    status: "Submitted",
    datesubmitted: "28th Nov 2022",
  },
  {
    id: 2,
    company: {
      logo: "../../Asset/images/companylogo.png",
      name: "BrowserStack",
    },
    title: "Android Developer",
    jobid: 18988,
    location: "Indore",
    status: "Rejected",
    datesubmitted: "2nd Dec 2022",
  },
  {
    id: 3,
    company: {
      logo: "../../Asset/images/companylogo.png",
      name: "Microsoft",
    },
    title: "Fronted Developer",
    jobid: 19009,
    location: "Hyderabad",
    status: "Selected",
    datesubmitted: "20th Oct 2022",
  },
  {
    id: 4,
    company: {
      logo: "../../Asset/images/companylogo.png",
      name: "Microsoft",
    },
    title: "Backend Developer",
    jobid: 21982,
    location: "Mumbai",
    status: "Under Consideration",
    datesubmitted: "20th Oct 2022",
  },
];
const Openings = () => {
  return (
    <Container>
      <Card className={styles.card}>
        <Row className={styles.headings}>
          <Col>Job Title</Col>
          <Col>Job ID</Col>
          <Col>Company</Col>
          <Col>Location</Col>
          <Col>Status</Col>
          <Col>Date Submitted</Col>
          <Col>Action</Col>
        </Row>
        <hr className={styles.hr}></hr>
        <div>
          {detailsarr.map((obj) => (
            <div key={obj.id}>
              <Rows obj={obj} />
              <hr className={styles.hr}></hr>
            </div>
          ))}
        </div>
      </Card>
    </Container>
  );
};

export default Openings;
