import Part from "../src/Part"
const Content = (props) => {
    console.log(props)    
    let parts = props.parts
    return(
        <>
          <Part part = {parts[0].part} exercises = {parts[0].exercises}/>
          <Part part = {parts[0].part} exercises = {parts[0].exercises}/>
          <Part part = {parts[0].part} exercises = {parts[0].exercises}/>
        </>
    );
}

export default Content;