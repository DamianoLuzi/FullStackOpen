import { useState, useEffect } from 'react';
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phonebookservice from "../src/services/phonebookservice"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() =>{
    console.log("use effect")
    phonebookservice
      .getAll()
      .then(initialPeople => {
        console.log("browser response",initialPeople)
        setPersons(initialPeople)
      })
      .catch(error => console.log("GET error",error.message))
  },[])  
  const handleFilterChange = (event) => {
    console.log("filter",event.target.value)
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

  const handleDeletePerson = (id) => {
    let personToDelete = persons.filter(p => p.id === id)
    let nameToDelete = personToDelete[0].name
    let idToDelete = personToDelete[0].id
    if(window.confirm(`Confirm to delete ${nameToDelete}`)) {
      phonebookservice
        .deletePerson(idToDelete)
        .then(response => response.data)
      setPersons(persons.filter(person => person.id !== idToDelete))
    }
  }
  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    console.log("new person",person)
    let names = persons.map(p=>p.name)
    if(!names.includes(person.name)){
      setPersons(persons.concat(person))
      phonebookservice
        .create(person)
        .then(np => {
          setPersons(persons.concat(np))
          setNewName('')
        })
    }else if(window.confirm(`${newName} is already added to phonebook, replace the old number witha new one?`)){
      //alert(`${newName} is already added to phonebook, replace the old number witha new one?`);
      let personToUpdate = persons.find(p => p.name === person.name)
      const updatedPerson = { ...personToUpdate, number: newNumber }
      console.log("person to update",personToUpdate)
      phonebookservice
        .update(updatedPerson)
        .then(returnedPerson => {
          console.log("successfully added",returnedPerson)     
          setPersons(persons.map(p=> p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
    setNewName('')
    setNewNumber('')    
  }
  console.log("people ",persons)
  let filteredpersons = persons.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange= {handleNumberChange}/>   
      <h2>Numbers</h2>
      <Persons people={filteredpersons} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App