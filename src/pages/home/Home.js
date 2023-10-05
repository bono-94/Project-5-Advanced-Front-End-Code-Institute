import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../styles/Home.module.css"; // Import the CSS module
import { Col, Row } from "react-bootstrap";

function Home() {
  const location = useLocation();
  const { state } = location;
  const [successMessage, setSuccessMessage] = useState(state?.successMessage || "");
  const [visible, setVisible] = useState(!!successMessage);

  useEffect(() => {
    if (successMessage) {
      // Automatically hide the alert after 8 seconds
      const timeout = setTimeout(() => {
        setVisible(false);
        setSuccessMessage(""); // Clear the success message after hiding
      }, 8000);
  
      return () => clearTimeout(timeout);
    } else {
      console.log("Scrolling to the top")
      window.scrollTo(0, 0);
    }
  }, [successMessage]);

  const handleAlertClose = () => {
    setVisible(false);
    setSuccessMessage(""); // Clear the success message on close
  };

  return (
    <div className={styles.Home}>
      {visible && (
        <div id="success-alert" className={`${styles.alert} ${styles.successAlert}`}>
          {decodeURIComponent(successMessage)}
          <button
            type="button"
            className={styles.closeButton}
            data-dismiss="alert"
            aria-label="Close"
            onClick={handleAlertClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <section id={styles.jumbotron} className={styles.jumbotron}>
        <div className={styles.containerJumbo}>
          <h2 className={styles.jumbotronTitle}>
            Welcome to Knowl3dg3 Containers!
          </h2>
          <p>
            Discover the future of knowledge collaboration with us. 
            Our platform is your gateway to the world of structured usable data, 
            revolutionizing the way you package, deploy, and scale your knowledge's content. 
            Dive into the world of endless creative possibilities and unleash the hidden
            potential for efficient and flexible capturing of your wisdom.
          </p>
        </div>
      </section>
      <Row fluid>
        <Col sm={12} xl={5} className="offset-xl-1 beat match">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Discover Containers</h2>
            <p className={styles.sectionDescription}>
              Embark on a life-long journey with containers are used for packaging,
              organizing and distributing your knowledge. You can append unlimited
              knowledge posts to each container that you are owner of. With convenience,
              each container's page containes list of belonging posts.
            </p>
            <div className="row">
              <div className="col-xl-6">
              <hr />
                <div className={styles.containerCard}>
                  <i className="fas fa-cube feature-icon"></i>
                  <h3 className={styles.containerTitle}>Container Types</h3>
                  <p className={styles.containerDescription}>
                  Additional privacy feature allows users to categorize each container
                  as private or public which restricts public access.
                  </p>
                </div>
              </div>
              <div className="col-xl-6">
              <hr />
                <div className={styles.containerCard}>
                  <i className="fas fa-cogs feature-icon"></i>
                  <h3 className={styles.containerTitle}>Container Benefits</h3>
                  <p className={styles.containerDescription}>
                    Unlimited storage & connections, user-friendly, privacy setting,
                    public collaboration, labelling, browsing & filtering
                  </p>
                  <a href="containers/" className={styles.cardButton}>Select</a>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col sm={12} xl={5} className="beat">
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Discover Knowl3dg3</h2>
            <p className={styles.sectionDescription}>
            Explore and contribute to our knowledge database 
            filled with fresh and verified information. You can append unlimited 
            containers to each knowledge. From flexible choices of categorizing 
            post into a topic, to selection of post category and unique titles,
            users are fully in control.
            </p>
            <div className="row">
              <div className="col-xl-6">
              <hr />
                <div className={styles.containerCard}>
                  <i className="fas fa-book-open feature-icon"></i>
                  <h3 className={styles.containerTitle}>Knowl3dg3 Types</h3>
                  <p className={styles.containerDescription}>
                    Anybody can share an announcement,
                    idea, news, event, interview, story, questions and many more.

                  </p>
                </div>
              </div>
              <div className="col-xl-6">
              <hr />
                <div className={styles.containerCard}>
                  <i className="fas fa-grin feature-icon"></i>
                  <h3 className={styles.containerTitle}>Knowl3dg3 Benefits</h3>
                  <p className={styles.containerDescription}>
                    Ideas capturing, interactive knowledge collaboration, big data organization,
                    learning & teaching, digital life.
                  </p>
                  <a href="/knowledge/live" className={styles.cardButton}>Select</a>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className={styles.homeSupport}>
        <div className="container">
          <h2 className="section-title">Customer Support</h2>
          <p className="section-description">
            We provide exceptional customer support to assist you with any
            questions, issues, or inquiries you may have. We also process 
            requests for new knowledge and containers. You can also ask us
            a question about content of existing knowledge through consultancy session. 
            There are always opportunities available to share your feedback with us 
            or by commenting on the knowledge post. In addition you are more than 
            welcome to subimt a suggestion for the website's fuctionalities.
          </p>
          <div className="row">
            <div className="col-md-6">
              <div className="support-card">
              <a href="/support">
                <i className="fas fa-headset feature-icon"></i>
                <h3 className="support-title">24/7 Support</h3>
              </a>
                <p className="support-description">
                  Our support team is available around the clock to help you
                  with technical assistance and troubleshooting. Please reach
                  out to us on the 'Support' button in the navigation bar, or 
                  by one of our contact options on the bottom of this page.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="support-card">
              <a href="/knowledge/live">
                <i className="fas fa-comments feature-icon"></i>
                <h3 className="support-title">Community Forum</h3>
              </a>
                <p className="support-description">
                  Join our public knowledge collaboration community forum
                  to engage with other users, share your input on their knowledge,
                  and seek solutions to common challenges. 
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </Row>
    </div>

  );
}

export default Home;
