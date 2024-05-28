import { useState } from 'react';
import { AuthContext } from '../contexts/index.js';

const AuthProvider = ({ children }) => {
  const saveUser = (user) => {
    localStorage.setItem('userId', user);
  };

  const getUser = () => JSON.parse(localStorage.getItem('userId'));

  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, saveUser, getUser
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
