import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

export const Filter = () => {
  const dispatch = useDispatch()
  const handleFilterChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <div>
      search:
      <input onChange = {handleFilterChange}/>
    </div>
  )
}