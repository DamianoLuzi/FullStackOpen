import {useState} from "react"

const StatisticLine = (props) => {
  let name = props.text
  return(
    <p>{name} {props.value}</p>
  );
}
const Statistics = (props) => {
  let ratings = props.ratings
  let sum = ratings[0] + ratings[1] + ratings[2]
  console.log(ratings[0])
  console.log("sum "+ sum)
  if(sum === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  } else return(
    <div>
      <table>
      <tr><td><StatisticLine text = "good" value = {ratings[0]}/></td></tr>
      <tr><td><StatisticLine text = "neutral" value = {ratings[1]}/></td></tr>
      <tr><td><StatisticLine text = "bad" value = {ratings[2]}/></td></tr>
      <tr><td><StatisticLine text = "all" value = {sum}/></td></tr>
      <tr><td><StatisticLine text = "average" value = {(ratings[0] * 1 + ratings[1] * 0 + ratings[2] * (-1))/sum}/></td></tr>
      <tr><td><StatisticLine text = "positive" value = {`${parseFloat(ratings[0] / sum) * 100 } %`}/></td></tr>
      </table>
    </div>
  );
}
const Header = (props) => (
  <h1>{props.title}</h1>
)
const Button = (props) => {
  return (
    <button onClick = {props.onClick}>
      {props.rating}
    </button>
  );

}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good+1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral+1)
  }
  const handleBadClick = () => {
    setBad(bad+1)
  }
  const ratings = [good,neutral,bad]

  return(
    <div>
      <Header title = "give feedbacks"/>
      <Button rating = "good" onClick = {handleGoodClick}/>
      <Button rating = "neutral" onClick = {handleNeutralClick}/>
      <Button rating = "bad"onClick = {handleBadClick}/>
      <Header title = "statistics"/>
      <Statistics ratings = {ratings}/>
    </div>

  );

}

export default App;