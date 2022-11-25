import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import styles from "./style/style.module.css";
import companyLogo from "../../Asset/images/companylogo.png";

const Rows = ({ obj }) => {
  const skills = obj.skill;
  return (
    <Row className={styles.rw}>
      <Col>
        <Col>
          <img className={styles.img} src={companyLogo} alt="CompanyLogo" />
        </Col>
        <Col className={styles.name}>{obj.company.name}</Col>
      </Col>
      <Col className={styles.cell}>{obj.role}</Col>
      <Col className={styles.cell}>{obj.location}</Col>
      <Col className={styles.cell}>{obj.experience}</Col>
      <Col className={styles.cell}>{obj.deadline}</Col>
      <Col className={styles.cell}>
        {skills.map((item) => (
          <Badge pill bg="primary">
            {item}
          </Badge>
        ))}
      </Col>
    </Row>
  );
};

export default Rows;
