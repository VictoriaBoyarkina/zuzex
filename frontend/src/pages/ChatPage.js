import Users from "../components/ChatUsers.js";
import Messages from "../components/ChatMessages.js";
import { useEffect } from "react";

const ChatPage = () => {
  useEffect(() => {
    document.title = 'Чат';
  }, []);

  return (
    <div className="container h-80 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Users />
        <Messages />
      </div>
    </div>
  );
};

export default ChatPage;
