import "./App.css";
import Card from "./components/Card";
import Searchbox from "./components/Searchbox/Searchbox";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    if (!sessionStorage.getItem("cities")) {
      fetch("https://api.openaq.org/v2/cities?country=GB&limit=200")
        .then((response) => response.json())
        .then((data) => {
          sessionStorage.setItem(
            "cities",
            JSON.stringify(data.results.map((result) => (result = result.city)))
          );
        });
    }
  }, []);

  return (
    <div className="App">
      <div className="headers">
        <h1>Compare your Air</h1>
        <h2>
          Compare the air quality between cities in the UK.
          <br />
          Select cities to compare using the search box below.
        </h2>
      </div>

      {sessionStorage.getItem("cities") ? (
        <div>
          <Searchbox
            placeholder="Enter city name..."
            options={JSON.parse(sessionStorage.getItem("cities"))}
          />
        </div>
      ) : (
        "LOADING"
      )}

      <br />

      <div className="card-row">
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default App;
