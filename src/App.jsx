import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const SingleCountry = ({ country }) => {
  // console.log("languages: ", country.languages);
  if (!country) {
    return null;
  }

  let languagesArr = Object.values(country.languages).map(function (value) {
    return value;
  });

  // console.log(languagesArr);

  const imgUrl = country.flags.png;

  // console.log(imgUrl);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages: </h3>
      {languagesArr.map((language) => {
        return <li key={language}>{language}</li>;
      })}

      <img src={imgUrl} style={{ marginTop: 10 }} />
    </div>
  );
};

const DisplayCountries = ({ countriesToShow, search, handleClick }) => {
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
    } else if (countriesToShow(search).length == 1) {
      return <SingleCountry country={countriesToShow(search)[0]} />;
    }

    return (
      <div>
        {countriesToShow().map((country) => {
          return (
            <li key={country.name.common}>
              {country.name.common}

              <button onClick={() => handleClick(country)}>Show</button>
            </li>
          );
        })}
      </div>
    );
  }
};

function App() {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
        console.log(countries);
      });
  }, []);

  useEffect(() => {
    setCountry(null);
  }, [search]);

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

  const handleClick = (country) => {
    setCountry(country);
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
          handleClick={handleClick}
        />
        <SingleCountry country={country} />
      </div>
    </>
  );
}

export default App;
