import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Containers.module.css";
import publicContainerImage from "../../assets/cloud-drawer.jpg";
import privateContainerImage from "../../assets/security-cloud.jpg";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Containers() {
  return (
    <>
      <section className={styles.additionalContent}>
        <h2>Create and Organize your Knowledge</h2>
        <p>
          With our containers solution, you can create custom environments to
          efficiently store, manage, and share your knowledge. Effortlessly add, edit, categorize, and
          connect multiple containers to multiple knowledge posts.
        </p>
        <Link to="/container/create" className={styles.createContainerLink}>
          Create Container
        </Link>
      </section>
      <section className={styles.containerCards}>
        <div className="row">
          <div className={`${styles.containerCard} ${styles.publicCard} col-lg-6 col-md-12 m-auto`}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <i className="fas fa-bullhorn"></i>
                <h2>PUBLIC CONTAINERS</h2>
              </div>
              <div className={styles.cardBack}>
                <img
                  src={publicContainerImage}
                  alt="Public Container"
                  className={`img-fluid ${styles.cardImage}`} // Add img-fluid class for responsive images
                />
                <p>
                  Discover our public container offerings and organize your
                  knowledge. Public containers are great for sharing your knowledge
                  with a wider audience.
                </p>
                <Link to="/containers/public/">
                  <button className={styles.selectButton}>Select</button>
                </Link>
              </div>
            </div>
          </div>
          <div className={`${styles.containerCard} ${styles.privateCard} col-lg-6 col-md-12 m-auto`}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <i className="fas fa-user-secret"></i>
                <h2>PRIVATE CONTAINERS</h2>
              </div>
              <div className={styles.cardBack}>
                <img
                  src={privateContainerImage}
                  alt="Private Container"
                  className={`img-fluid ${styles.cardImage}`} // Add img-fluid class for responsive images
                />
                <p>
                  Explore your private containers and manage knowledge
                  securely. Private containers are ideal for confidential
                  information and limited access.
                </p>
                <Link to="/containers/private/">
                  <button className={styles.selectButton}>Select</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.features}>
        <div className="row">
          <div className={`${styles.feature} col-sm-5 offset-sm-1 col-lg-3 offset-lg-0`}>
            <div className={styles.featureIcon}>
              <i className="fas fa-server"></i>
            </div>
            <h3>Reliability</h3>
            <p>Our container services are highly reliable and secure 24/7.</p>
          </div>
          <div className={`${styles.feature} col-sm-5 offset-sm-1 col-lg-3 offset-lg-0`}>
            <div className={styles.featureIcon}>
              <i className="fas fa-warehouse"></i>
            </div>
            <h3>Capacity</h3>
            <p>Large storage space for your structured data and files.</p>
          </div>
          <div className={`${styles.feature} col-sm-5 offset-sm-1 col-lg-3 offset-lg-0`}>
            <div className={styles.featureIcon}>
              <i className="fas fa-search"></i>
            </div>
            <h3>Browse</h3>
            <p>Effortlessly search and filter containers inside long lists.</p>
          </div>
          <div className={`${styles.feature} col-sm-5 offset-sm-1 col-lg-3 offset-lg-0`}>
            <div className={styles.featureIcon}>
              <i className="fas fa-plug"></i>
            </div>
            <h3>Connect</h3>
            <p>Append infinite knowledge posts to infinite containers.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Containers;
