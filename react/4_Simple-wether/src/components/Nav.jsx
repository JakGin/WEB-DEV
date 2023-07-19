import React from "react";
import "/src/styles/Nav.css";

function Nav({ location }) {

  return (
    <nav className="nav">
      <img src="/images/sun.png" alt="logo" width="100" />
      <h2 className="city-name">{location.cityName}</h2>
      <h4 className="post-code">{location.postCode}</h4>
    </nav>
  );
}

export default Nav;
