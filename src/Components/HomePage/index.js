import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import styles from "./style/style.module.css";
import RecommendedJobs from "./RecommendedJobs";
function HomePage() {
  return (
    <Container>
      <Col>
        <Row className={styles.welcome}>Welcome to</Row>
        <Row className={styles.headings}>
          <b>Skill Check</b>
        </Row>
      </Col>
      
      <RecommendedJobs skill="Java Developer" />
      <RecommendedJobs skill="iOS Developer" />
    </Container>
  );
}

export default HomePage;
