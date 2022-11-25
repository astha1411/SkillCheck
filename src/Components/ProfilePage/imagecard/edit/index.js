import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import styles from "./style/style.module.css";

import { GrEdit } from "react-icons/gr";
const Edit = ({ orgs, skill }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        <GrEdit className={styles.edit} />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className={styles.head}>
          Edit Profile
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Enter Name" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Current Company</Form.Label>
              <Form.Control placeholder="Enter current employer" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Role</Form.Label>
              <Form.Control placeholder="Enter role" autoFocus />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload New Profile Picture</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
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
};

export default Edit;
