import parse from "html-react-parser";

const User = (props) => {
  const userIcon = parse(props.user.avatar);
  return (
    <li key={props.user.key} className="nav-item w-100 d-flex align-items-center mb-4" >
      <div style={{ minWidth: "30px" }} className="me-2">
        {userIcon}
      </div>
      <span className="d-inline-block text-dark fw-semibold text-nowrap text-truncate">{props.user.userName}</span>
    </li>
  );
};

export default User;
