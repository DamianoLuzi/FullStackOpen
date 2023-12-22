const Person = (props) => {
    return(
        <li key={props.person.id}>{props.person.name} {props.person.number}</li>
    );
}

export default Person;