import React from "react";
import Nav from "./components/Nav";
import Main from "./components/Main";
import "./styles/app.css";

function App() {
  const [location, setLocation] = React.useState({
    cityName: "Warsaw",
    postCode: "00-001",
    latitude: null,
    longtitude: null,
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      setLocation((prevLocation) => ({
        ...prevLocation,
        latitude: lat,
        longtitude: long,
      }));
    });
  }, []);

  React.useEffect(() => {
    async function getLocation() {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${
          location.latitude
        }&lon=${location.longtitude}&apiKey=${import.meta.env.VITE_API_KEY}`
      );
      const data = await res.json();
      setLocation((prevLocation) => ({
        ...prevLocation,
        cityName: data.features[0].properties.city,
        postCode: data.features[0].properties.postcode,
      }));
    }
    if (location.latitude && location.longtitude) {
      getLocation();
    }
  }, [location.latitude, location.longtitude]);

  return (
    <>
      <Nav location={location} />
      {location.latitude && location.longtitude ?
        <Main location={location} /> :
        <Main location={{...location, latitude: 52.2354, longtitude: 21.0104}} />}
    </>
  );
}

export default App;
