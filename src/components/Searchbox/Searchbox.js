import "./Searchbox.css";
import { useState } from "react";

const Searchbox = ({ placeholder, options, onSuggestionClick }) => {
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (e) => {
    const query = e.target.value;

    if (query) {
      setSuggestions(
        options.filter(
          (option) =>
            option.toLowerCase().includes(query.toLowerCase()) &&
            option[0].toLowerCase() === query[0].toLowerCase()
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  return (
    <form>
      <input
        className="searchbox"
        type="text"
        placeholder={placeholder}
        onChange={onChange}
      />

      {suggestions.length > 0 ? (
        <ul className="searchbox--suggestion-list">
          {suggestions.map((suggestion, i) => (
            <li
              key={i}
              className="searchbox--suggestion"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      ) : (
        false
      )}
    </form>
  );
};

export default Searchbox;
