import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "../style/style.module.css";
import companyLogo from "../../../../Asset/images/companylogo.png";

const Rows = ({ obj }) => {
  return (
    <Row className={styles.rw}>
      <Col>
        <img className={styles.img} src={companyLogo} alt="CompanyLogo" />
      </Col>
      <Col className={styles.name}>{obj.name}</Col>
    </Row>
  );
};

export default Rows;
