import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { displayNotification } from "../reducers/notificationReducer"
export const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //substituting async functions inside components, enclosing them inside the reducer which then dispatches them
    dispatch(createAnecdote(content))
    dispatch(displayNotification(`You added "${content}"!`, 5))

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