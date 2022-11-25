import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Jobs from "./Card";
import Card from 'react-bootstrap/Card';

import styles from "./style/style.module.css";
const data = [
  {
    id: 1,
    company: "Amazon",
    logo: "../../../../Asset/images/companylogo.png",
    role: "iOS Developer",
    location: "Indore",
    exp: "1-2 years",
    deadline: "30th Nov 2022",
  },
  {
    id: 2,
    company: "Microsoft",
    logo: "../../../../Asset/images/companylogo.png",
    role: "Java Developer",
    location: "Mumbai",
    exp: "2 years",
    deadline: "14th Nov 2022",
  },
  {
    id: 3,
    company: "Groww",
    logo: "../../../../Asset/images/companylogo.png",
    role: "Android Developer",
    location: "Delhi",
    exp: "Upto 5 years",
    deadline: "20th Nov 2022",
  },
];
const RecommendedJobs = ({ skill }) => {
  return (
    <Card>
    <Card.Header><Row className={styles.rw}>
    <Col className={styles.title}>Recommended Jobs for {skill}</Col>
    <Col className={styles.more}>
      <Button variant="light">More</Button>{" "}
    </Col>
  </Row></Card.Header>
  <Card.Body>
   
        <Row>
          {data.map((item) => (
            <Jobs jobdetails={item} />
          ))}
        </Row>
        </Card.Body>
      </Card>
  );
};

export default RecommendedJobs;
