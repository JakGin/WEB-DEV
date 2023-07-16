import React from "react";
import "/src/styles/Nav.css";

function Nav() {
  const [cityName, setCityName] = React.useState("Warsaw");
  const [postCode, setPostCode] = React.useState("00-001");

  React.useEffect(() => {
    async function getLocation() {
      let lat = 52.2354;
      let long = 21.0104;

      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
      });

      // const res = await fetch(
      //   `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=7ea427b40c084203ad2bb3ce701fdce1`
      // );
      // const data = await res.json();
      // setCityName(data.features[0].properties.city);
      // setPostCode(data.features[0].properties.postcode);
    }
    getLocation();
  }, []);

  return (
    <nav className="nav">
      <img src="/images/sun.png" alt="logo" width="100" />
      <h2 className="city-name">{cityName}</h2>
      <h4 className="post-code">{postCode}</h4>
    </nav>
  );
}

export default Nav;
