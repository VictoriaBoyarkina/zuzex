import { useAuth } from "../hooks/index.js";
import { useNavigate } from "react-router-dom";
import routes from "../routes.js";
import { useDispatch } from "react-redux";
import { logOut} from "../actions/socketActions.js";

const LogOutButton = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    auth.logOut();
    localStorage.clear();
    navigate(routes.loginPage());
    dispatch(logOut());
  };

  return (
    <button type="button" onClick={signOut} className="btn btn-outline-dark btn-sm">
      Выйти
    </button>
  );
};

export default LogOutButton;
