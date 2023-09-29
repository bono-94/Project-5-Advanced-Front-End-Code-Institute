import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const successMessage = searchParams.get("successMessage");

  const [visible, setVisible] = useState(!!successMessage);

  useEffect(() => {
    if (successMessage) {
      // Automatically hide the alert after 8 seconds
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 8000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  const handleAlertClose = () => {
    setVisible(false);
  };

  return (
    <div className="landing-page">
      {visible && (
        <div className="alert alert-success alert-dismissible show">
          {decodeURIComponent(successMessage)}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            onClick={handleAlertClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      <header className="header">
        <nav className="navbar">
          <div className="container">
            <a href="/" className="navbar-brand">
              Your Logo
            </a>

          </div>
        </nav>

        <div className="hero">
          <div className="container">
            <h1 className="hero-title">Welcome to Your Website</h1>
            <p className="hero-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              in dui mauris.
            </p>
            <a href="#contact" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </div>
      </header>

      <section id="features" className="features">
        <div className="container">
          <div className="feature">
            <i className="fas fa-cogs feature-icon"></i>
            <h3 className="feature-title">Feature 1</h3>
            <p className="feature-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="feature">
            <i className="fas fa-users feature-icon"></i>
            <h3 className="feature-title">Feature 2</h3>
            <p className="feature-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="feature">
            <i className="fas fa-globe feature-icon"></i>
            <h3 className="feature-title">Feature 3</h3>
            <p className="feature-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <p className="section-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
            dui mauris.
          </p>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <p className="section-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
            dui mauris.
          </p>
          
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Your Website</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;




