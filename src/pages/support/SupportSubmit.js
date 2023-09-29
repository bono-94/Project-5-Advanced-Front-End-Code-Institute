import React from "react";
import { Link } from "react-router-dom";

function SupportSubmit({ successMessage, supportId }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Support Form</h2>
              <div className="alert alert-warning">
                {successMessage}
                  <h5>Congratulations!</h5>
                  <br></br>
                  <p>Your support request has been successfully submitted</p>
              </div>
              <div className="text-center">
                <Link to="/" className="btn btn-dark text-warning">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportSubmit;