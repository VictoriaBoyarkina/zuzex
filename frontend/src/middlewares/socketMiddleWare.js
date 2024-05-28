import { io } from "socket.io-client";

const createMySocketMiddleware = (url) => {
  return (storeAPI) => {
    let socket = io(url);

    socket.on("update users", (users) => {
      storeAPI.dispatch({
        type: "SOCKET_ALL_USERS",
        payload: users,
      });
    });

    socket.on("all messages", (messages) => {
      storeAPI.dispatch({
        type: "SOCKET_ALL_MESSAGES",
        payload: messages,
      });
    });

    socket.on("chat message", (message) => {
      storeAPI.dispatch({
        type: "SOCKET_MESSAGE_RECEIVED",
        payload: message,
      });
    });

    return (next) => (action) => {
      switch (action.type) {
        case "SEND_WEBSOCKET_MESSAGE":
          socket.emit("chat message", action.payload);
          break;
        case "SEND_WEBSOCKET_USER":
          socket.emit("user joined", action.payload);
          break;
        case "GET_WEBSOCKET_MESSAGES":
          socket.emit("get messages");
          break;
        case "LOGOUT":
          socket.emit("log out");
        default:
          return next(action);
      }
    };
  };
};

export default createMySocketMiddleware;
