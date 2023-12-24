import { useState, useEffect } from 'react'
import fcservice from "./services/fcservice";
import Countries from "../src/components/Countries";

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fcservice
      .fetchAll()
      .then(response => {
        setCountries(response)
      })
  },[]);

  const handleSearchChange = (event) => {
    console.log("search",event.target.value)
    setSearch(event.target.value)
    const fc = countries.filter(c => c.name.official.toLowerCase().includes(search.toLowerCase()))
    console.log("filtered countries",filteredCountries)
    setFilteredCountries(fc)
  }

  const handleShowClick = (country) => {
    const filteredCountries = countries.filter(c =>{
      return c.name.official === country.name.official
    })
    setFilteredCountries(filteredCountries)
  }

  return(
    <div>
      <form>
        find countries<input onChange={handleSearchChange}/>
      </form>
      <Countries filter={search} countries={filteredCountries} handleShowClick={handleShowClick}/>
    </div>
  );
  
}

export default App
