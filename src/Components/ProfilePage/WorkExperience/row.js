import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./style/style.module.css";

import { GoVerified } from "react-icons/go";
const Rows = ({ obj }) => {
  return (
    <Row className={styles.rw}>
      <Col>{obj.company}</Col>
      <Col>
        {obj.duration}
        {obj.duration === "1" ? " yr" : " yrs"}
      </Col>
      <Col>
        {obj.verified && <GoVerified />}
        <Col />
      </Col>
    </Row>
  );
};

export default Rows;
