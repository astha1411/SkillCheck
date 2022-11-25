import React from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import * as styles from "./Header.module.css";
import { withRouter } from "react-router";

function Header(props) {
  const { location } = props;
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            {/* <img src={logo} alt="logo" /> */}
            <b>Skill Check</b>
          </Navbar.Brand>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search People, Jobs.."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary">Search</Button>
          </Form>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/" className={styles.icon} activeKey="/">
                <i class="fas fa-home fa-2x"></i>
              </Nav.Link>
              <Nav.Link href="/Notifications" className={styles.icon}>
                <i class="fas fa-bell fa-2x"></i>
              </Nav.Link>
              <Nav.Link href="/Jobs" className={styles.icon}>
                <i class="fas fa-suitcase fa-2x"></i>
              </Nav.Link>
              <Nav.Link href="/Applications" className={styles.icon}>
                <i class="fas fa-file fa-2x"></i>
              </Nav.Link>
              <Nav.Link href="/Profile" className={styles.icon}>
                <i class="fas fa-user fa-2x"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;
