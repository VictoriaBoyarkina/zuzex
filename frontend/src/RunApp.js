import { io } from "socket.io-client";
import App from "./components/App.js";

const RunApp = () => {
  const socket = io();

  // socket.on("newMessage", (message) => {
  //   dispatch(messagesActions.addMessage(message));
  // });

  // socket.on("newChannel", (channel) => {
  //   dispatch(channelsActions.addChannel(channel));
  // });

  // socket.on("removeChannel", (channel) => {
  //   dispatch(channelsActions.removeChannel(channel.id));
  // });

  // socket.on("renameChannel", (channel) => {
  //   dispatch(
  //     channelsActions.updateChannel({
  //       id: channel.id,
  //       changes: {
  //         name: channel.name,
  //       },
  //     })
  //   );
  // });

  return <App socket={socket} />;
};

export default RunApp;
