const CountryCard = (props) => {
	console.log("country card",props)
  const country = props.country
	const name = country.name.official
	return(
		<div>
			<h1>{name}</h1>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<h2>languages</h2>
			<ul>
				{Object.keys(country.languages).map(key =>{
					const language = country.languages[key]
					return <li>{language}</li>
				})}
			</ul>
			<img src={country.flags.png} alt={country.flags.alt}/>			
		</div>
	);
}

export default CountryCard;