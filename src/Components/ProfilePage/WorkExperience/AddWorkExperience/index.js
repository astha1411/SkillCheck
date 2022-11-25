import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { IoMdAddCircleOutline } from "react-icons/io";

function AddWorkExperience() {
  const arr = [
    { value: "", text: "--Select Company--" },
    { value: "jpmc", text: "J.P. Morgan Chase & Co." },
    { value: "goldmansachs", text: "Goldman Sachs" },
    { value: "razorpay", text: "Razorpay" },
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        <IoMdAddCircleOutline />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Previous Work Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Company Name</Form.Label>
              <Form.Select>
                {arr.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Position</Form.Label>
              <Form.Control placeholder="Enter role" autoFocus />
            </Form.Group>
            <Row>
              <Col>
                <Form.Label>Start Date: </Form.Label>
                <Form.Control type="date" name="start_date" />
              </Col>
              <Col>
                <Form.Label>End Date: </Form.Label>
                <Form.Control type="date" name="end_date" />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddWorkExperience;
