import React from 'react';

const Persons = ({ namesToShow }) => {
  return namesToShow.map((person, i) => (
    <p key={i}>
      {person.name} {person.number}
    </p>
  ));
};

export default Persons;
