import "./App.css";
import Card from "./components/Card/Card";
import Searchbox from "./components/Searchbox/Searchbox";
import { useEffect, useState } from "react";
import { ReactComponent as SpinnerIcon } from "./svg/spinner.svg";

const App = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("cities")) {
      setLoading(true);
      fetch("https://api.openaq.org/v2/cities?country=GB&limit=200")
        .then((response) => response.json())
        .then((data) => {
          sessionStorage.setItem(
            "cities",
            JSON.stringify(data.results.map((result) => (result = result.city)))
          );
        })
        .then(() => setLoading(false));
    }
  }, []);

  const fetchAirQuality = (cityName) => {
    if (
      selectedCities.length < 2 &&
      !selectedCities.some((selectedCity) => selectedCity.city === cityName)
    ) {
      fetch(
        `https://api.openaq.org/v1/latest?city=${encodeURIComponent(cityName)}`
      )
        .then((response) => response.json())
        .then((data) =>
          setSelectedCities([...selectedCities, data.results[0]])
        );
    }
  };

  const removeSelectedCity = (cityToRemove) => {
    setSelectedCities(
      selectedCities.filter(
        (selectedCity) => selectedCity.city !== cityToRemove.city
      )
    );
  };

  return (
    <div className="app">
      <div className="headers">
        <h1>Compare your Air</h1>
        <h2>Compare the air quality between cities in the UK.</h2>
        <h2>Select cities to compare using the search tool below.</h2>
      </div>

      {loading ? (
        <SpinnerIcon className="loading-spinner" />
      ) : (
        <div>
          <Searchbox
            placeholder="Enter city name..."
            options={JSON.parse(sessionStorage.getItem("cities"))}
            onSuggestionClick={fetchAirQuality}
          />
        </div>
      )}

      <div className="card-row">
        {selectedCities.map((city, i) => (
          <Card
            cityData={city}
            onClose={() => removeSelectedCity(city)}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
