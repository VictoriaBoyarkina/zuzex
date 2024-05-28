export const sendSocketMessage = (message) => {
  console.log(message)
  return {
      type: "SEND_WEBSOCKET_MESSAGE",
      payload: message
  }
}

export const addNewUser = (user) => {
  return {
      type: "SEND_WEBSOCKET_USER",
      payload: user
  }
}

export const getMessages = () => {
  return {
      type: "GET_WEBSOCKET_MESSAGES",
  }
}

export const logOut = () => {
  return {
      type: "LOGOUT",
  }
}
