import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import logo from "../assets/logo.png";
import styles from "../styles/Footer.module.css";
import { NavLink } from "react-bootstrap";

function Footer() {
  return (
    <footer className={styles.Footer}>
      <Container fluid>
      <Row fluid>
  <Col className={`d-flex align-items-center justify-content-between ${styles.LogoButtonContainer}`}>
    <img
      src={logo}
      alt="Brand Logo"
      width="100"
      className={styles.Spinner}
    />
    <Button
      variant="link"
      className={`text-light align-self-start`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <i className="fas fa-arrow-circle-up"></i>
    </Button>
  </Col>
</Row>
      <Row fluid>
       <Col className={`${styles.Contact}`}>
            <h5>KNOWL3DG3 CONTAINERS</h5>
            <p>
              <i className="fas fa-map-marker-alt"></i> 123 Main St, New York, USA
            </p>
            <p>
              <i className="fas fa-phone"></i> +1 (123) 456-7890
            </p>
            <p>
              <i className="fas fa-envelope"></i> knowl3dg3@containers.com
            </p>
          </Col>
        </Row>
        
        <hr className="bg-light" />
        <Row>
          <Col className={`${styles.Social}`}>
            <div className="d-flex justify-content-center justify-content-md-end">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook fa-2x mr-3"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-2x mr-3"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram fa-2x mr-3"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
            </div>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col>
            <p className="text-center">
              &copy; {new Date().getFullYear()} KNOWL3DG3 CONTAINERS. ALL RIGHTS RESERVED
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
