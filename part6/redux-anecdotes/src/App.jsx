import { useDispatch, useSelector } from 'react-redux'
import AnecdotesList from './components/AnecdotesList'
import { createAnecdote } from './reducers/anecdoteReducer'
const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))

  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList/>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App