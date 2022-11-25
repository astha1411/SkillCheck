import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./style/style.module.css";
import Rows from "./row";
import AddSkill from "./AddSkill";

const Skill = ({ detailsarr }) => {
  return (
    <Card className={styles.card}>
      <Row>
        <Col className={styles.title}>SKILLS</Col>
        <Col className={styles.add}>
          <AddSkill />
        </Col>
      </Row>
      <Row className={styles.headings}>
        <Col>Skill</Col>
        <Col>Organizational Endorsement</Col>
        <Col>Peer Endorsement</Col>
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

export default Skill;
