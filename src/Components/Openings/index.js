import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import styles from "./style/style.module.css";
import Rows from "./row";
import FiltersBanner from "./FiltersBanner";

const detailsarr = [
  {
    id: 1,
    company: {
      logo: "../../Asset/images/companylogo.png",
      name: "PhonePe",
    },
    role: "Java Lead",
    location: "Bangalore",
    experience: "Upto 5 years",
    deadline: "28th Nov 2022",
    skill: ["Java", "JUnit"],
  },
  {
    id: 2,
    company: {
      logo: "../../Asset/images/companylogo.png",
      name: "BrowserStack",
    },
    role: "Android Developer",
    location: "Hyderabad",
    experience: "0-1 year",
    deadline: "2nd Dec 2022",
    skill: ["Java", "Kotlin", "C++"],
  },
];
const Openings = () => {
  return (
    <Container>
      <FiltersBanner />
      <Card className={styles.card}>
        <Row className={styles.headings}>
          <Col>Company</Col>
          <Col>Role</Col>
          <Col>Location</Col>
          <Col>Experience</Col>
          <Col>Deadline</Col>
          <Col>Skills Required</Col>
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
