import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./style/style.module.css";
import companyLogo from "../../Asset/images/companylogo.png";
import Actions from "./Actions";

const appliedoptions = ["Withdraw"];
const acceptoptions = ["Accept", "Decline"];
const rejectoptions = ["Remove"];

const Rows = ({ obj }) => {
  var options = [];

  if (obj.status === "Submitted") options = appliedoptions;
  else if (obj.status === "Selected") options = acceptoptions;
  //else if (obj.status === "Rejected") options = rejectoptions;

  var color = "red";
  if (obj.status === "Submitted") color = "blue";
  else if (obj.status === "Under Consideration") color = "orange";
  else if (obj.status === "Selected") color = "green";

  return (
    <Row className={styles.rw}>
      <Col className={styles.cell}>{obj.title}</Col>
      <Col className={styles.cell}>{obj.jobid}</Col>
      <Col>
        <Col>
          <img className={styles.img} src={companyLogo} alt="CompanyLogo" />
        </Col>
        <Col className={styles.name}>{obj.company.name}</Col>
      </Col>

      <Col className={styles.cell}>{obj.location}</Col>
      <Col className={styles.cell}>
        <div style={{ color: color }}>{obj.status}</div>
      </Col>
      <Col className={styles.cell}>{obj.datesubmitted}</Col>
      <Col className={styles.cell}>
        <Actions options={options} />
      </Col>
    </Row>
  );
};

export default Rows;
