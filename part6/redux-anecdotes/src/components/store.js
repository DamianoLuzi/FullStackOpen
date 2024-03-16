import { configureStore } from "@reduxjs/toolkit"
import anecdoteReducer, { appendAnecdote, setAnecdote } from "../reducers/anecdoteReducer"
import filterReducer from "../reducers/filterReducer"
import notificationReducer from "../reducers/notificationReducer"
import anecdotesService from '../../services/anecdotesService'
const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filters: filterReducer,
    notifications: notificationReducer
  }
})

/* anecdotesService
  .getAll()
  .then(as =>
    as.forEach(a => {
      //adding anecdotes to the initial state, via the appendAnecdote action
      store.dispatch(setAnecdote(a))
    })
  ) */



store.subscribe(() => { console.log(store.getState()) })

export default store