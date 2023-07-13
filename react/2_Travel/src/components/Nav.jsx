import React from "react";
import "../styles/nav.css";

function Nav() {
  return (
    <>
      <nav>
        <div className="logo">
          <div className="content">
            <div className="inner-content">
              <img src="/images/airplane_icon.png" alt="logo" width="100" />
              <h1>Travel with us</h1>
            </div>
          </div>
        </div>
      </nav>
      <div className="options">
        <a href="#" className="option">Who we are</a>
        <a href="#" className="option">What we offer</a>
        <a href="#" className="option">Contact</a>
    </div>
  </>
  );
}

export default Nav;
