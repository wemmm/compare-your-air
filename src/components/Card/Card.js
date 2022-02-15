import "./Card.css";
import { formatDistanceToNow } from "date-fns";
import { ReactComponent as CloseIcon } from "../../svg/close.svg";

const Card = ({ cityData, onClose }) => {
  return (
    <div className="card">
      <div className="card--close-button" onClick={onClose}>
        <CloseIcon />
      </div>
      <p className="card--updated-time">
        UPDATED{" "}
        {formatDistanceToNow(
          new Date(cityData.measurements[0].lastUpdated)
        ).toUpperCase()}{" "}
        AGO
      </p>
      <h3>{cityData.city}</h3>
      <p className="card--location">in {cityData.location}, United Kingdom</p>
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
