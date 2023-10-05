import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import logo from "../assets/logo.png";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer>
      <Container className={styles.Footer} fluid>
        <Row className={styles.Footer} fluid>
          <Col md={4}>
            <img
              src={logo}
              alt="Brand Logo"
              width="100"
              className={styles.Spinner}
            />
            <h5>Brand Name</h5>
            <p>
              <i className="fas fa-map-marker-alt"></i> Address: 123 Main St,
              City, Country
            </p>
            <p>
              <i className="fas fa-phone"></i> Contact: +1 (123) 456-7890
            </p>
            <p>
              <i className="fas fa-envelope"></i> Email: info@example.com
            </p>
          </Col>
          <Col md={8}>
            <Button
              variant="link"
              className="text-light float-right"
              onClick={() => window.scrollTo(0, 0)}
            >
              <i className="fas fa-arrow-circle-up fa-2x"></i>
            </Button>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col>
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