import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CountryDetails from './CountryDetails';
import CountryList from './CountryList';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const showCountry = (name) => {
    setSearch(name);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  let result;
  if (countriesToShow.length > 10) {
    result = <p>Too Many matches, specify another filter</p>;
  } else if (countriesToShow.length > 1) {
    result = (
      <CountryList countries={countriesToShow} showCountry={showCountry} />
    );
  } else if (countriesToShow.length === 1) {
    const country = countriesToShow[0];
    result = <CountryDetails country={country} />;
  }

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      {result}
    </div>
  );
};

export default App;
