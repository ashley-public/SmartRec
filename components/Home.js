import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 text-center">
            <h2 className="display-3 fw-bold mb-3 text-primary">SmartRec</h2>
            <p className="fs-4 mb-5 text-secondary">Revolutionizing the recommendation process.</p>

            <h2 className="mb-4 text-dark">We help....</h2>

            <ul className="d-flex flex-wrap justify-content-center gap-4 mb-5">
              <li className="bg-light text-dark p-4 rounded-3 shadow-sm w-75 w-md-auto">
                Save time for guidance counselors
              </li>
              <li className="bg-light text-dark p-4 rounded-3 shadow-sm w-75 w-md-auto">
                Generate unique and personalized recommendations for students
              </li>
              <li className="bg-light text-dark p-4 rounded-3 shadow-sm w-75 w-md-auto">
                Gives counselors time for students
              </li>
            </ul>

            <div className="d-grid gap-2 d-sm-flex justify-content-center">
              <Link to="/login" className="btn btn-primary btn-lg px-5 py-3 fw-bold">
                Explore Now!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
