import React, { useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../context";
import "../styles.scss";
import Blog from "./Blog";
import Profile from "./Profile";

export const Home = () => {
  const { user } = useParams();
  const { loggedIn, checkLoginState, getProfileBlog, setGetProfileBlog } =
    useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (user === undefined) {
      setGetProfileBlog(false);
    }
  }, [user]);

  useEffect(() => {
    if (!getProfileBlog) checkLoginState();
    else {
      navigate(`/mypost`);
    }
  }, [getProfileBlog]);

  return (
    <div id="blog">
      {user !== undefined && <Link to="/">Back to Home</Link>}
      <div className="add-blog-button">
        <button
          className="btn btn-primary"
          onClick={() => {
            if (loggedIn) {
              navigate("/addblog");
            } else {
              alert("Please login in order to create blog");
            }
          }}
        >
          <small>Add Blog</small>
        </button>
        <div id="right-content">
          <Profile />
        </div>
      </div>
      <Blog />
    </div>
  );
};
