import { useDispatch, useSelector } from 'react-redux'
import AnecdotesList from './components/AnecdotesList'
import { createAnecdote } from './reducers/anecdoteReducer'
import { AnecdoteForm } from './components/AnecdoteForm'
import { Filter } from './components/Filter'
const App = () => {
    
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecdotesList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App