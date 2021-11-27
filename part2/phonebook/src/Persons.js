import React from 'react';
import personService from './services/persons';

const Persons = ({ namesToShow, removePerson }) => {
  return namesToShow.map((person, i) => (
    <p key={i}>
      {person.name} {person.number}{' '}
      <button onClick={() => removePerson(person)}>delete</button>
    </p>
  ));
};

export default Persons;
