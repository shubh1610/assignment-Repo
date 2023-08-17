import { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const AuthContext = createContext();
export const serverUrl = "https://zany-jade-panther-fez.cyclic.cloud";

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [getProfileBlog, setGetProfileBlog] = useState(false);
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);

  const checkLoginState = () => {
    try {
      fetch(`${serverUrl}/auth/logged_in`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((body) => {
          setLoggedIn(body.loggedIn);
          setUser(body.user);
        });
      axios
        .get(`${serverUrl}/getblogs`)
        .then((res) => setBlogs(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  };
  const logOut = () => {
    try {
      fetch(`${serverUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((body) => {
          setLoggedIn(body.loggedIn);
          setUser({});
        });
    } catch (err) {
      console.error(err);
    }
  };
  const getUserPost = () => {
    axios
      .get(serverUrl + "/getblogsbyid", { params: { user: user.email } })
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        checkLoginState,
        blogs,
        logOut,
        user,
        getUserPost,
        setGetProfileBlog,
        getProfileBlog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
