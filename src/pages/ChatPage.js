import Users from "../components/ChatUsers.js";
import Messages from "../components/ChatMessages.js";
import { useEffect } from "react";

const ChatPage = () => {
  useEffect(() => {
    document.title = "Чат";
  }, []);

  return (
    <div className="container h-100 overflow-hidden d-flex align-items-center">
      <div className="h-90 overflow-hidden rounded shadow w-100">
        <div className="row h-100 bg-white flex-md-row">
          <Users />
          <Messages />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
