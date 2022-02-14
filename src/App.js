import "./App.css";
import Card from "./components/Card";
import Searchbox from "./components/Searchbox";

const App = () => {
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

      <div>
        <Searchbox />
      </div>
      <br />

      <div className="card-row">
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default App;
