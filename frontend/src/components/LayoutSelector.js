import LoginPage from "./../pages/LoginPage.js";
import ChatPage from "./../pages/ChatPage.js";
import routes from "../routes.js";
import PrivateRoute from "./AppPrivateRoute.js";
import { Routes, Route, useLocation } from "react-router-dom";
import EmptyLayout from "../layouts/EmptyLayout.js";
import MainLayout from "../layouts/MainLayout.js";
import { useAuth } from "../hooks/index.js";

function LayoutSelector() {
  const location = useLocation();
  const auth = useAuth();

  // Determine the wrapper based on the pathname
  let Wrapper =
    location.pathname === "/login" || !auth.loggedIn ? EmptyLayout : MainLayout;

  return (
    <Wrapper
      children={
        <Routes>
          <Route path={routes.loginPage()} element={<LoginPage />} />
          <Route
            path={routes.chatPage()}
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
        </Routes>
      }
    >
    </Wrapper>
  );
}

export default LayoutSelector;
