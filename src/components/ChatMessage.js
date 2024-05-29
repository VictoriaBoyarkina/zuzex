import { useAuth } from "../hooks/index.js";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useToast } from "../hooks/index.js";
import { Modal } from "react-bootstrap";

const Message = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auth = useAuth();
  const user = auth.getUser();
  const { message } = props;
  const { addToast } = useToast();

  const [image, setImage] = useState(null);

  const loadImage = (base64) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `data:image/jpeg;base64,${base64}`;
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const loadedImage = await loadImage(message.img);
        setImage(loadedImage);
      } catch (error) {
        addToast("Не удалось загрузить фотографию", "bg-danger text-white");
        console.error("Error loading image:", error);
      }
    };

    if (message.img) {
      fetchImage();
    }
  }, [message.img]);

  const userIcon = parse(message.userAvatar);

  const divClasses =
    message.userId === user.id
      ? "text-break bg-body py-2 px-3 rounded-4 d-table bg-success-subtle"
      : "text-break bg-body py-2 px-3 rounded-4 d-table";

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} centered="true">
        <Modal.Header
          style={{ position: "absolute", right: 0, border: "none" }}
          closeButton
        ></Modal.Header>
        {image && <img src={image.src} className="card-img-top rounded-0" />}
      </Modal>
      <div className="d-flex align-items-center mb-2" key={message.id}>
        <div style={{ minWidth: "30px" }} className="me-2 align-self-end">
          {userIcon}
        </div>
        {image && (
          <div
            className={
              message.userId === user.id
                ? "card bg-success-subtle border-0 rounded-4"
                : "card border-0 rounded-4"
            }
            style={{ maxWidth: 22 + "rem"}}
          >
            {message.userId !== user.id ? (
              <p
                className="py-2 px-3 fw-medium mb-0 text-primary"
                style={{ fontSize: 12 + "px" }}
              >
                {message.userName}
              </p>
            ) : null}
            <img
              src={image.src}
              className="card-img-top rounded-0"
              onClick={handleShow}
              style={{ cursor: "pointer" }}
            />
            {message.text && (
              <div className="card-body py-2" style={{ fontSize: 12 + "px" }}>
                {message.text}
              </div>
            )}
          </div>
        )}
        {message.text && !image && (
          <div className={divClasses} style={{ fontSize: 12 + "px" }}>
            {message.userId !== user.id ? (
              <p
                className="fw-medium mb-0 text-primary"
                style={{ fontSize: 12 + "px" }}
              >
                {message.userName}
              </p>
            ) : null}
            {message.text}
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
