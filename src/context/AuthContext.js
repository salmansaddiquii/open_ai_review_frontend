import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [user, setuser] = useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [token, settoken] = useState(null);

  const value = {
    user,
    setuser,
    isLoggedIn,
    setisLoggedIn,
    settoken,
    token,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
