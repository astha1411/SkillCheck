import React from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./style/style.module.css";
import ShowOrgs from "./OrgEndorse";
import ShowPeers from "./PeerEndorse";
const Rows = ({ obj }) => {
  return (
    <Row className={styles.rw}>
      <Col>{obj.skill}</Col>
      <Col>
        <ShowOrgs orgs={obj.orgendorse} skill={obj.skill} />
        {obj.orgendorse.length}
      </Col>

      <Col>
        <ShowPeers peers={obj.peerendorse} skill={obj.skill} />
        {obj.peerendorse.length}
      </Col>
    </Row>
  );
};

export default Rows;
