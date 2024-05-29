import getUserName from "../functions/getUserName.js";
import getAvatar from "../functions/getAvatar.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/index.js";
import routes from "../routes.js";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { addNewUser } from "../actions/socketActions.js";
import { useToast } from "../hooks/index.js";
import koalaIcon from "../assets/img/koala-icon.svg";
import Loader from "../components/AppLoader.js";

const LoginPage = () => {
  // localStorage.clear();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      auth.logIn();
      navigate(routes.chatPage());
      setLoading(false);
    }
    document.title = "Логин";
  }, []);

  const handleClick = async () => {
    setLoading(true);
    try {
      const userName = await getUserName();
      const avatar = await getAvatar(userName);

      const user = {
        userName,
        avatar,
        id: uniqid(),
      };
      auth.saveUser(JSON.stringify(user));
      auth.logIn();
      navigate(routes.chatPage());
      setLoading(false);
    } catch (e) {
      addToast(
        "Не нашлось подходящего имени для вас :(",
        "bg-danger text-white"
      );
      console.log(e);
      setLoading(false);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-8 col-sm-10 col-md-8 col-xxl-6">
        <div className="card shadow-sm pt-3">
          <img
            src={koalaIcon}
            className="card-img-top align-self-center"
            alt="icon"
            style={{ maxWidth: "16rem" }}
          />
          <div className="cardbody p-3 d-flex justify-content-center flex-column">
            <p className="text-center">
              Добро пожаловать в самый крутой чатик!
            </p>
            <button
              className="btn btn-secondary w-15 align-self-center"
              onClick={handleClick}
            >
              Войти
            </button>
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              <span> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addNewUser })(LoginPage);
