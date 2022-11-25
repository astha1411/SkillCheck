import React from "react";
import { Row, Col, Container, Card, Collapse, CardGroup } from "react-bootstrap";
import CompanyLogo from "../../../Asset/images/companylogo.png";
import styles from "./style/style.module.css";

const ApplicationStatus = ({ Job }) => {
  return (
    <Card className={styles.card}>
      <CardGroup>
        <Card>
          <Row>
            <img
              className={styles.img}
              //src={Job.company.logo}
              src={CompanyLogo}
              alt="CompanyLogo"
            />
          </Row>

          <Row>{Job.company.name}</Row>
        </Card>

        <Card className={styles.head}>
          Your Job Application <b>{Job.title} </b> submitted on{" "}
          {Job.datesubmitted} is {Job.status}
        </Card>
      </CardGroup>
    </Card>
  );
};

export default ApplicationStatus;
