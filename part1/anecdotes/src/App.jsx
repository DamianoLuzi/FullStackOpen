import { useState } from 'react'

const Button = (props) => {
  return(
    <button onClick = {props.onClick}>
      {props.text}
    </button>
  );
}

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  );
}

function App() {
  const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  'The only way to go fast, is to go well.'
]

const [selected, setSelected] = useState(0)
const [voted, setVoted] = useState(Array(anecdotes.length).fill(0))
const handleClick = () => {
  const min = 0
  const max = anecdotes.length - 1
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  setSelected(randomNumber)
}
const handleVote = () => {
  const newVotes = [...voted]  
  newVotes[selected] += 1
  setVoted(newVotes)
}
const maxIndex = voted.indexOf(Math.max(...voted))
return (
  <div>
    <Header title = "Anectode of the day"/>
    <p>{anecdotes[selected]}</p>
    <p>has {voted[selected]} votes</p>
    <Button text = "vote" onClick = {handleVote}/>
    <Button text = "next anecdote" onClick = {handleClick}/>  
    <Header title = "Anectode with most votes"/>
    <p>{anecdotes[maxIndex]}</p>
    <p>has {voted[maxIndex]} votes </p>
  </div>
)
}


export default App
