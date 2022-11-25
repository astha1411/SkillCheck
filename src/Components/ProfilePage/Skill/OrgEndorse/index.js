import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { RiUserStarFill } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";

import Rows from "./row";
import styles from "../style/style.module.css";

const ShowOrgs = ({ orgs, skill }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        <RiUserStarFill className="ms-1" size="20px" />
      </Button>
     
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton className={styles.head}>
            {skill} endorsed by Organizations
          </Modal.Header>
          <Modal.Body scrollable={true}>
            <div>
              {orgs.map((obj) => (
                <div key={obj.id}>
                  <Rows obj={obj} />

                  <hr className={styles.hr}></hr>
                </div>
              ))}
            </div>
          </Modal.Body>
        </Modal>
       
    </>
  );
};

export default ShowOrgs;
