import { createContext, useState } from "react";
import {
  get_blogs,
  user_logout,
  getBlogsById,
  user_loggedIn,
} from "./Services";
export const AuthContext = createContext();
export const serverUrl = "https://zany-jade-panther-fez.cyclic.cloud";
// export const serverUrl = "http://localhost:8080";

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [getProfileBlog, setGetProfileBlog] = useState(false);
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState();

  const checkLoginState = () => {
    user_loggedIn(token).then((body) => {
      setLoggedIn(body.loggedIn);
      if (body.loggedIn) {
        setUser({
          name: body.newUser.Name,
          email: body.newUser.Email,
          _id: body.newUser["_id"],
        });
      }
    });

    get_blogs()
      .then((res) => {
        setBlogs(res);
      })
      .catch((err) => console.log(err, "Error"));
  };

  const logOut = () => {
    user_logout().then((body) => {
      setLoggedIn(body.loggedIn);
      setUser({});
    });
  };

  const getUserPost = () => {
    console.timeLog(user);
    getBlogsById(user)
      .then((response) => setBlogs(response))
      .catch((err) => console.log(err, "Error"));
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
