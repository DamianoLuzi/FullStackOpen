const filterReducer = (state = null, action) => {
  console.log('filter action type', action.type)
  switch(action.type) {
    case 'SET_FILTER': return action.payload
    default: return state
  }
}

export const filterChange = (filterString) => {
  return {
    type: 'SET_FILTER',
    payload : filterString
  }
}

export default filterReducer