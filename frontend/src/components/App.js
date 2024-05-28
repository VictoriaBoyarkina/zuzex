import React from "react";
import AuthProvider from "./AppAuthProvider.js";
import ToastProvider from "./ToastProvider.js";
import store from "../store/index.js";
import { Provider } from "react-redux";
import LayoutSelector from "./LayoutSelector.js";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ToastProvider>
          <AuthProvider>
            <BrowserRouter>
              <LayoutSelector />
            </BrowserRouter>
          </AuthProvider>
        </ToastProvider>
      </Provider>
    </div>
  );
}

export default App;
