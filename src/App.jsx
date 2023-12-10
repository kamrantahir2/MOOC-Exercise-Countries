import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        console.log(countries);
      });
  }, []);

  if (!countries) {
    return null;
  }

  const countriesToShow = () => {
    if (search === "") {
      return countries;
    } else {
      return countries.filter((country) =>
        country.name.common.toLowerCase().startsWith(search.toLowerCase())
      );
    }
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <h1>Countries</h1>
      <div>
        Search: <input value={search} onChange={handleChange} />
      </div>
      <div>
        {countriesToShow().map((country) => {
          return <li key={country.name.common}>{country.name.common}</li>;
        })}
      </div>
    </>
  );
}

export default App;
