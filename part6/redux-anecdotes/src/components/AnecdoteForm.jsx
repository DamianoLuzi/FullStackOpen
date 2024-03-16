import { useDispatch } from "react-redux"
import { createAnecdotes } from "../reducers/anecdoteReducer"
import anecdotesService from "../../services/anecdotesService"
export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnec = await anecdotesService.createNewAnecdote(content)
    dispatch(createAnecdotes(content))
    dispatch(showNotification(`"${content}" successfully added!`))
    setTimeout(() => {
      dispatch(showNotification(''))
    }, 5000)

  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}