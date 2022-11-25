import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import styles from "../style/style.module.css";
import Form from "react-bootstrap/Form";
import SkillTags from "./SkillTags";
const locarr = [
  { value: "", text: "Location" },
  { value: "mumbai", text: "Mumbai" },
  { value: "bangalore", text: "Bangalore" },
  { value: "indore", text: "Indore" },
];
const exparr = [
  { value: "", text: "Experience" },
  { value: "ltone", text: "< 1 year " },
  { value: "one_three", text: "1-3 years" },
  { value: "three_five", text: "3-5 years" },
  { value: "mt_five", text: "> 5 years" },
];
const designationarr = [
  { value: "", text: "Designation" },
  { value: "javabackend", text: "Java Backend Developer " },
  { value: "android", text: "Android Development" },
  { value: "frontend", text: "Frontend Development" },
  { value: "angular", text: "Angular Development" },
];

const sortarr = [
  { value: "", text: "Sort Jobs by" },
  { value: "apply before", text: "Apply Before" },
  { value: "recentjobs", text: "Recent Jobs" },
  { value: "experience", text: "Experience" },
];

const FiltersBanner = () => {
  return (
    <Container>
      <Card className={styles.card}>
        <Form>
          <Row>
            <Col>
              <Form.Select>
                {locarr.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                {exparr.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                {designationarr.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row className={styles.filter}>
            <Col>
              <SkillTags />
            </Col>

            <Col>
              <Form.Select>
                {sortarr.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default FiltersBanner;
