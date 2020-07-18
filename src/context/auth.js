import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  navItem: "home",
};

const pathname = window.location.pathname;
const path = pathname === "/" ? "home" : "login";
initialState.navItem = path;

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  navItem: "home",
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "NAV":
      return {
        ...state,
        navItem: action.payload,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  }

  function setHome() {
    dispatch({
      type: "NAV",
      payload: "home",
    });
  }

  function setLogin() {
    dispatch({
      type: "NAV",
      payload: "login",
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        navItem: state.navItem,
        setHome,
        setLogin,
        login,
        logout,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
