import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const DisplayCountries = ({ countriesToShow, search }) => {
  console.log("countriesToShow: ", countriesToShow());

  if (search === "") {
    return (
      <div>
        {countriesToShow(search).map((country) => {
          return <li key={country.name.common}>{country.name.common}</li>;
        })}
      </div>
    );
  } else {
    if (countriesToShow(search).length > 10) {
      return (
        <div>
          <p>Too many matches, try a more specific search</p>
        </div>
      );
    }

    return (
      <div>
        {countriesToShow().map((country) => {
          return <li key={country.name.common}>{country.name.common}</li>;
        })}
      </div>
    );
  }
};

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

  const countriesToShow = (searchInput) => {
    if (searchInput === "") {
      return countries;
    } else {
      return countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
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
        <DisplayCountries
          countriesToShow={() => countriesToShow(search)}
          search={search}
        />
      </div>
    </>
  );
}

export default App;
