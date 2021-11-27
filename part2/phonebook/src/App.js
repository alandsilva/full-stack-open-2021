import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    personService.getAll().then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    // Check if name already exists
    if (persons.find((person) => person.name === newPerson.name)) {
      updatePerson(newPerson);
    } else {
      personService.create(newPerson).then((response) => {
        setPersons(persons.concat(response.data));
      });
    }
    setNewName('');
    setNewNumber('');
  };
  const updatePerson = (newPerson) => {
    if (
      window.confirm(
        `${newPerson.name} is already added to phonebook. Replace the old number with a new one?`
      )
    ) {
      const person = persons.find((person) => person.name === newPerson.name);
      const changedPerson = { ...person, number: newPerson.number };
      personService.update(person.id, changedPerson).then((response) => {
        setPersons(
          persons.map((p) => (p.id !== person.id ? p : response.data))
        );
      });
    }
  };

  const removePerson = (personToRemove) => {
    if (window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService.remove(personToRemove.id).then(() => {
        setPersons(persons.filter((person) => person.id !== personToRemove.id));
      });
    }
  };

  const namesToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons namesToShow={namesToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
