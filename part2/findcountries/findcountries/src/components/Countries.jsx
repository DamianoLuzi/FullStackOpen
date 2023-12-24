import CountryCard from "../components/CountryCard";
import ShowButton from "./ShowButton";

const Countries = (props) => {
    const countries = props.countries
		const filter = props.filter
		let filteredCountries = countries.filter(c => {
			return c.name.official.toLowerCase().includes(filter.toLowerCase())
		})
		console.log("countries ",filteredCountries)

		/*const handleShowClick = (country) => {
			console.log("single country to show",country)		
			filteredCountries = filteredCountries.filter(c => {
				return c.name.official === country.name.official;
			})
			console.log("single filtered country",filteredCountries)
		}*/

    if(filteredCountries.length <= 10 && filteredCountries.length > 1){
			return(
				<div>
					<ul>
						{filteredCountries.map(c => {
							return(
								<li key={c.altSpellings[0]}>
								  {c.name.official} 
								<ShowButton onClick={() => props.handleShowClick(c)}/>
								</li>
							);
						})}
					</ul>
				</div>
			);
		} else if(filteredCountries.length == 1) {
			console.log("single country card",filteredCountries[0])
			return (
				<CountryCard country = {filteredCountries[0]}/>
			);
		} else return(
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		);
}

export default Countries;