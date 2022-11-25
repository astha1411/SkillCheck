import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./style/style.module.css";
import Rows from "./row";
import AddWorkExperience from "./AddWorkExperience";

const WorkExp = ({ detailsarr }) => {
  return (
    <Card className={styles.card}>
      <Row>
        <Col className={styles.title}>WORK EXPERIENCE</Col>
        <Col className={styles.add}>
          <AddWorkExperience />
        </Col>
      </Row>

      <Row className={styles.headings}>
        <Col>Company</Col>
        <Col>Duration</Col>
        <Col>Verified</Col>
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
  );
};

export default WorkExp;
