import { useAuth } from "../hooks/index.js";
import parse from "html-react-parser";
import koalaIcon from "../assets/img/koala-icon.svg";
import LogoutBtn from "../components/ChatLogoutBtn.js";

const MainLayout = (props) => {
  const { children } = props;
  const auth = useAuth();
  const user = auth.getUser();

  const { userName, avatar } = user;
  const userIcon = parse(avatar);

  return (
    <>
      <nav className="navbar bg-body-tertiary border-bottom shadow-sm overflow-hidden">
        <div className="container">
          <div>
            <img
              src={koalaIcon}
              alt="logo"
              style={{ width: "25px" }}
              className="me-3"
            />
            <span className="navbar-text text-dark fw-semibold">
              {userName}
            </span>
          </div>
          <div className="d-flex align-items-center">
            <div className="me-3" style={{ width: "50px" }}>
              {userIcon}
            </div>
            <div>
              {" "}
              <LogoutBtn />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};

export default MainLayout;
