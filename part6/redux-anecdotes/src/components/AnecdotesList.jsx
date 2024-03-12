import { useSelector, useDispatch } from 'react-redux'
import { addVotes } from '../reducers/anecdoteReducer'

const AnecdotesList = () => {
  const anecdotes = useSelector(state => {
    return state.sort((a,b) => b.votes-a.votes)
  })
  const dispatch = useDispatch()
  const vote = (anec_id, content) => {
    console.log('vote', anec_id, content)
    dispatch(addVotes(anec_id))
    //dispatch(setNotification(`You've just voted for "${content}" !`, 5))
  }
  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdotesList