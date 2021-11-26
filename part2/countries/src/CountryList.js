import React from 'react';

const CountryList = ({ countries, showCountry }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.alpha2Code}>
          {country.name}{' '}
          <button
            onClick={() => {
              showCountry(country.name);
            }}
          >
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
