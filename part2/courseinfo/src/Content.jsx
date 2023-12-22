import Part from "../src/Part"
const Content = (props) => {
    console.log(props)    
    let parts = props.parts
    return(
        <>
          {
            parts.map(part => (
              <Part part = {part.name} exercises = {part.exercises}/>
            ))
          }
        </>
    );
}

export default Content;