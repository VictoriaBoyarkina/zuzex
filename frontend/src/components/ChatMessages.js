import { useState, useRef, useEffect } from "react";
import Message from "./ChatMessage.js";
import ScrollToBottom from "react-scroll-to-bottom";
import sendIcon from "../assets/img/send-icon.svg";
import attachIcon from "../assets/img/paperclip-icon.svg";
import ImagePreview from "./ChatImagePreview.js";
import ImageUpload from "./ChatImageUpload.js";
import { useAuth } from "../hooks/index.js";
import { useDispatch } from "react-redux";
import { useMessages } from "../hooks/index.js";
import uniqid from "uniqid";
import { sendSocketMessage, getMessages } from "../actions/socketActions.js";

const Messages = () => {
  const [messageValue, setMessageValue] = useState("");
  const [base64String, setBase64String] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  // Add focus to input
  const inputEl = useRef();
  useEffect(() => {
    inputEl.current.focus();
  });

  // Get current user
  const auth = useAuth();
  const user = auth.getUser();

  // On input
  const handleChange = (e) => {
    setMessageValue(e.target.value);
  };

  // Upload image
  const handleImageLoad = (imagePreview, base64String) => {
    setBase64String(base64String);
    setImagePreview(imagePreview);
  };

  // Get all messages
  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const messages = useMessages();

  // Send message
  const handleSubmit = (e) => {
    setSubmitting(true);
    const message = {
      text: messageValue,
      img: base64String,
      id: uniqid(),
      userId: user.id,
      date: Date.now(),
    };
    e.preventDefault();
    console.log(message);
    dispatch(sendSocketMessage(message));
    setSubmitting(false);
    setMessageValue("");
    setImagePreview("");
    setBase64String("");
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <ScrollToBottom className="overflow-hidden h-100 messages-container">
          <div
            id="messages-box"
            className="chat-messages overflow-auto px-4 pt-3"
          >
            {messages.map((message) => (
              <Message key={message.d} message={message} />
            ))}
          </div>
        </ScrollToBottom>

        <div className="mt-auto px-4 py-3">
          <form
            noValidate=""
            onSubmit={handleSubmit}
            className="d-flex py-1 h-100 w-100"
          >
            <ImageUpload
              onImageLoad={handleImageLoad}
              onLoading={(props) => setUploading(props)}
              children={
                <>
                  <img
                    src={attachIcon}
                    alt="attach-icon"
                    style={{ width: "20px" }}
                  />
                  <span className="visually-hidden">Прикрепить</span>
                </>
              }
            />
            <input
              disabled={isSubmitting}
              value={messageValue}
              ref={inputEl}
              onChange={handleChange}
              name="body"
              aria-label="Новое сообщение"
              placeholder="Напишите сообщение..."
              className="border rounded-2 h-100 ps-2 form-control"
            />
            <button
              type="submit"
              disabled={!messageValue && !imagePreview}
              className="btn btn-group-vertical border border-0 p-2"
            >
              <img src={sendIcon} alt="send-icon" style={{ width: "25px" }} />
              <span className="visually-hidden">Отправить</span>
            </button>
          </form>
        </div>
        {uploading && (
          <div className="pb-2 ps-5 ms-2">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {imagePreview && (
          <ImagePreview
            base64String={imagePreview}
            closeImage={() => {
              setImagePreview("");
              setBase64String("");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Messages;
