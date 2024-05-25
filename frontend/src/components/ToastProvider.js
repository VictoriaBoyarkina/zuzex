import { useState } from "react";
import uniqid from "uniqid";
import { ToastContext } from "../contexts/index.js";

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, variant) => {
    const newToast = { id: uniqid(), message, variant };
    setToasts([...toasts, newToast]);

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toast) => toast.id !== newToast.id)
      );
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-relative z-3"
      >
        <div className="toast-container top-0 end-0 p-3">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast ${toast.variant} show`}
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-body">{toast.message}</div>
            </div>
          ))}
        </div>
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
