import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
//import axios from "axios";
import "./showBlog.scss";
import { AuthContext, serverUrl } from "../context";
import { Button } from "react-bootstrap";

export const ShowBlog = () => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();
  const { blogs, user } = useContext(AuthContext);

  const blogComment = watch("blogComment");
  let { id } = useParams();
  const [blogId] = useState(id);
  const [comments, setComments] = useState([]);
  const blogContent = blogs?.filter((blog) => blog["_id"] === blogId)[0];
  const onSubmit = () => {
    const author = user?.email;
    const authorName = user?.name;
    const newComment = { blogId, author, authorName, blogComment };
    const options = {
      method: "POST",
      body: JSON.stringify(newComment),
    };
    fetch(serverUrl + "/comment/addComment", options)
      .then((response) => response.json())
      .then((response) => setComments(response.data))
      // axios
      //   .post(serverUrl + "/comment/addComment", newComment)
      //   .then((res) => {
      //     setComments(res.data);
      //   })
      .catch((err) => console.log(err, "err"));
  };
  useEffect(() => {
    fetch(serverUrl + "/comment/getComments", { params: { id: blogId } })
      .then((response) => response.json())
      .then((response) => setComments(response.data))
      .catch((err) => console.log(err, "Error"));
    // axios
    //   .get(serverUrl + "/comment/getComments", { params: { id: blogId } })
    //   .then((res) => {
    //     setComments(res.data);
    //   })
    //   .catch((err) => console.log(err, "err"));
  }, []);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ blogComment: "" });
    }
  }, [reset, formState]);

  return (
    <div className="show-blog">
      <Link to="/">Back to Home</Link>
      <div className="blog-section">
        <span className="blog-title">{blogContent?.Title}</span>
        <span className="blog-content">{blogContent?.Content}</span>
      </div>
      <div className="addComment-form">
        <div id="circle-avatar" className="text-center mb-4 ">
          <span>{user?.name[0]}</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="addComment-input">
            <input
              type="text"
              placeholder="Add Comment"
              {...register("blogComment")}
            ></input>
            <Button type="submit" class="btn btn-outline-primary btn-lg">
              <span className="addComment-button">Post Comment</span>
            </Button>
          </div>
        </form>
      </div>
      <ul>
        {comments.map((comment) => {
          return (
            <div className="comment-section">
              <div id="circle-avatar" className="text-center mb-4">
                <span>{user?.name[0]}</span>
              </div>
              <div className="comment-content">{comment?.Comment}</div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
