import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name:"notification",
  initialState:'',
  reducers: {
    displayNotification (state, action) {
      return action.payload
    },
    hideNotification (state, action) {
      return ''
    }
  }

})


export const {displayNotification, hideNotification} = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return dispatch => {
    dispatch(displayNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout*3000)
  }
}

export default notificationSlice.reducer