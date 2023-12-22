import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = (props) => {
  const courses = props.courses
	console.log(courses);
  return(
    <div>
			<Header name = "Web development curriculum"/>
      {courses.map(c =>{
				let total = c.parts.map(p => p.exercises).reduce((x,y) => x+y,0)
				return (
					<div key = {c.id}>
						<Header name={c.name}/>
						<Content parts={c.parts}/>
						<Total total={total}/>
					</div>
				);
			})}
    </div>
  );
}

export default Course;