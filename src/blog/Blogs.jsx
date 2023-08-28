import React, { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../context";
import "../styles.scss";
import Profile from "./Profile";

export const Blogs = () => {
  const { user } = useParams();
  const {
    blogs,
    loggedIn,
    checkLoginState,
    getProfileBlog,
    setGetProfileBlog,
  } = useContext(AuthContext);

  let toShow = "";
  const navigate = useNavigate();
  const limit = 200;
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    if (user == undefined) {
      setGetProfileBlog(false);
    }
  }, [user]);

  useEffect(() => {
    if (!getProfileBlog) checkLoginState();
    else {
      navigate(`/mypost`);
    }
  }, [getProfileBlog]);

  const showMore = (blog) => {
    navigate("/showblog/" + blog["_id"]);
    setShowAll(true);
  };
  function contentToShow(blog) {
    toShow = blog.Content.substring(0, limit) + "...";
  }

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
      {blogs?.map((blog) => {
        return (
          <>
            <div className="App">
              <Container className="p-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{blog.Title}</Card.Title>
                    {contentToShow(blog)}
                    {blog.Content.length <= limit ? (
                      <Card.Text>{blog.Content}</Card.Text>
                    ) : (
                      <Card.Text>{toShow}</Card.Text>
                    )}
                    <Button variant="primary" onClick={() => showMore(blog)}>
                      View Blog
                    </Button>
                  </Card.Body>
                </Card>
              </Container>
            </div>
          </>
        );
      })}
    </div>
  );
};
