import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../actions/socketActions.js";
import { useUsers } from "../hooks/index.js";
import User from "./ChatUser.js";

const Users = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const users = useUsers();

  return (
    <div className="col-4 col-md-3 border-end px-0 bg-light flex-column h-100 d-none d-md-flex d-lg-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 px-3 py-4 ">
        {
          users.length === 0 ? <span className="text-wrap text-truncate">Тут только вы</span> : <span className="text-wrap text-truncate">Пользователи в сети:</span>
        }
      </div>
      <ul
        id="channels-box"
        className="flex-column nav-pills nav-fill px-3 mb-3 h-100 d-block scrollbar"
      >
        {users.map((user) => <User key={user.id} user={user}/>)}
      </ul>
    </div>
  );
};

export default Users;
