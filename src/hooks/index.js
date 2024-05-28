import { useContext } from 'react';
import { useSelector } from "react-redux";
import { selectors as usersSelectors } from "../store/usersSlice.js";
import { selectors as messagesSelectors } from "../store/messagesSlice.js";
import { AuthContext, ToastContext } from '../contexts/index.js';


export const useAuth = () => useContext(AuthContext);
export const useToast = () => useContext(ToastContext);

export const useUsers = () => {
  const auth = useAuth();
  const user = auth.getUser();
  const users = useSelector(usersSelectors.selectAll);
  const filtredUser = users.filter((u) => u.id !== user.id);
  return filtredUser.reverse();
}

export const useMessages = () => {
  const users = useSelector(usersSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);
  const result = messages.map((message) => {
    const curUser = users.find((u) => u.id === message.userId);
    return {
      ...message,
      userName: curUser.userName,
      userAvatar: curUser.avatar,
    }
  });
  return result;
}
