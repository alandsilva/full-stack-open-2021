import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({ country }) => {
  const [info, setInfo] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;
  const capital = country.capital.replace(/\s/g, '%20');

  useEffect(() => {
    const query = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`;
    axios.get(query).then((response) => {
      setInfo(response.data);
    });
  }, []);

  let temp, wind_speed, wind_dir;

  if (info.current) {
    temp = info.current.temperature;
    wind_speed = info.current.wind_speed;
    wind_dir = info.current.wind_dir;
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.nativeName}>{language.name}</li>
        ))}
      </ul>
      <div>
        <img style={{ width: '50%' }} src={country.flag} alt={country.name} />
      </div>

      <h3>Weather in {country.capital}</h3>
      <p>
        <strong>temperature </strong>
        {temp}
      </p>
      <p>
        <strong>wind </strong>
        {wind_speed} mph direction {wind_dir}
      </p>
    </div>
  );
};

export default CountryDetails;
