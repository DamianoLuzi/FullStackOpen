const Total = (props) => {
    let parts = props.parts
    let total = parts.map(p => p.exercises).reduce((ex1,ex2) => ex1 + ex2, 0)
    return (
        <p>Number of exercises {total}</p>
    );
}

export default Total;