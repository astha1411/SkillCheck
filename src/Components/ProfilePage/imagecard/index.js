import React from "react";
import { Card, Row } from "react-bootstrap";
import styles from "./style/style.module.css";
import ProfileInfo from "./profiledetails";

const ProfileCard = ({ isReferee }) => {
  return (
    <Card className={styles.card}>
      <Row className={styles.backg}></Row>
      <Row className={styles.im}></Row>
      <Row className={styles.details}>
        <ProfileInfo
          infotext="Software Developer at JPMC"
          name="Astha Thakur"
          githublink="https://github.com"
          leetcodelink="https://leetcode.com"
          linkedinlink="https://www.linkedin.com/feed/"
          resume="https://docs.google.com/document/d/1dOaSpZAaRUMCR4P5OO1caAbppgPziZs9mQ-WHwZCz9k/edit?usp=sharing"
        />
      </Row>
    </Card>
  );
};

export default ProfileCard;
