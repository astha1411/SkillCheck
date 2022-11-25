import { Card, Row, Col, Container } from "react-bootstrap";
import companyLogo from "../../../../Asset/images/companylogo.png";
import { IoLocationSharp } from "react-icons/io5";
import { FaSuitcase, FaInfoCircle } from "react-icons/fa";
import styles from "./style/style.module.css";
const Jobs = ({ jobdetails }) => {
  return (
    <Container className={styles.rw}>
      <Card
        bg="primary"
        text="white"
        style={{ width: "18rem" }}
        className="mb-2"
      >
        <Row className={styles.company}>
          <Col>
            <img className={styles.img} src={companyLogo} alt="CompanyLogo" />
          </Col>
          <Col className={styles.name}>{jobdetails.company}</Col>
        </Row>
        <Row className={styles.role}>{jobdetails.role}</Row>
        <Row>
          <Col className={styles.col}>
            <Col>
              <IoLocationSharp />
            </Col>
            <Col>
              {/* <Row>Location</Row> */}
              <Row>{jobdetails.location}</Row>
            </Col>
          </Col>
          <Col className={styles.col}>
            <Col>
              <FaSuitcase />
            </Col>
            <Col>
              {/* <Row>Experience</Row> */}
              <Row>{jobdetails.exp}</Row>
            </Col>
          </Col>
        </Row>
        <Row className={styles.apply}>
          <center>
            <b>Apply before {jobdetails.deadline}</b>
          </center>
        </Row>
      </Card>
    </Container>
  );
};
export default Jobs;
