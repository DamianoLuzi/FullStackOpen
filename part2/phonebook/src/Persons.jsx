import Person from "./Person";
const Persons= (props) => {
    const filteredpersons = props.people
    console.log(filteredpersons)
    return(
        <ul>
        {filteredpersons.map(p =>(
          <Person person={p}/>
        ))}
      </ul>
    );
}
export default Persons;