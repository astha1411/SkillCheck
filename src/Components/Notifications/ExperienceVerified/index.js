import React from "react";
import { Row, Col, Container, Card, Collapse } from "react-bootstrap";
import CompanyLogo from "../../../Asset/images/companylogo.png";
import styles from "./style/style.module.css";

const ApplicationStatus = ({ Job }) => {
  return (
    <Card className={styles.card}>
      <Row className={styles.rw}>
        <Col className={styles.logo}>
          <Row>
            <img
              className={styles.img}
              //src={Job.company.logo}
              src={CompanyLogo}
              alt="CompanyLogo"
            />
          </Row>

          <Row>{Job.company.name}</Row>
        </Col>

        <Col className={styles.head}>
          Your Job Application <b>{Job.title} </b> submitted on{" "}
          {Job.datesubmitted} is {Job.status}
        </Col>
      </Row>
    </Card>
  );
};

export default ApplicationStatus;
