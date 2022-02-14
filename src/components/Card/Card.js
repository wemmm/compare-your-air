import { formatDistanceToNow } from "date-fns";

const Card = ({ cityData }) => {
  return (
    <div className="card">
      <p>
        UPDATED{" "}
        {formatDistanceToNow(
          new Date(cityData.measurements[0].lastUpdated)
        ).toUpperCase()}{" "}
        AGO
      </p>
      <h3>{cityData.city}</h3>
      <p>In {cityData.location}, United Kingdom</p>
      <b>
        Values:{" "}
        {cityData.measurements
          .map(
            (measurement) =>
              measurement.parameter.toUpperCase() + ": " + measurement.value
          )
          .join(", ")}
      </b>
    </div>
  );
};

export default Card;
