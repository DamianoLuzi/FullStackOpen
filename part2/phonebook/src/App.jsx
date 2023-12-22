import { useState, useEffect } from 'react';
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() =>{
    console.log("use effect")
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log("response ",response)
        setPersons(response.data)
      })
  },[])  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
   const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length +1
    }
    console.log("new person",person)
    let names = persons.map(p=>p.name)
    if(!names.includes(person.name)){
      setPersons(persons.concat(person))
    }else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName('')
    setNewNumber('')    
  }
  let filteredpersons = persons.filter(p =>
    p.name.toLocaleLowerCase().includes(filter))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange= {handleNumberChange}/>   
      <h2>Numbers</h2>
      <Persons people={filteredpersons}/>
    </div>
  )
}

export default App