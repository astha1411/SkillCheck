import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./style/style.module.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Edit from "../edit";


const ProfileInfo = (props) => {
  const resume = props.resume;

  return (
    <div>
      <Edit/>
      <Row className={styles.carddetails}>
        <Col>
          <Row className={styles.name}>{props.name}</Row>

          <Row className={styles.rw}>{props.infotext}</Row>
          <Row>
            <button
              className={styles.button}
              onClick={() => window.open(resume, "_blank")}
            >
              RESUME
            </button>
          </Row>
        </Col>

        <Col>
          <Row className={styles.rightcol}>
            <Col className={styles.icon}>
              <a href={props.githublink} target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            </Col>
            <Col className={styles.icon}>
              <a href={props.leetcodelink} target="_blank" rel="noreferrer">
                <SiLeetcode className="icons" />
              </a>
            </Col>

            <Col className={styles.icon}>
              <a href={props.linkedinlink} target="_blank" rel="noreferrer">
                <FaLinkedin className="icons" />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileInfo;
