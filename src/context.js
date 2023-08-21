import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const serverUrl = "https://zany-jade-panther-fez.cyclic.cloud";
 //export const serverUrl = "http://localhost:8080";


export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [getProfileBlog, setGetProfileBlog] = useState(false);
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState();

  const checkLoginState = () => {
    console.log(token,"token");
    try {
      fetch(serverUrl + "/auth/logged_in", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          token:{token}
        })
      })
        .then((response) => response.json())
        .then((body) => {
          setLoggedIn(body.loggedIn);
          setUser(body.user);
        });
      axios
        .get(serverUrl + "/getblogs")
        .then((res) => setBlogs(res.data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  const logOut = () => {
    try {
      fetch(serverUrl + "/auth/logout", {
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
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
