import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogComments, addComment } from "../Services";
import { useForm } from "react-hook-form";
import "./showBlog.scss";
import { AuthContext } from "../context";
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
  const { blogs, user, loggedIn } = useContext(AuthContext);
  const blogComment = watch("blogComment");
  let { id } = useParams();
  const [blogId] = useState(id);
  const [comments, setComments] = useState([]);
  const blogContent = blogs?.filter((blog) => blog["_id"] === blogId)[0];
  const onSubmit = async () => {
    const author = user?.email;
    const authorName = user?.name;
    const newComment = { blogId, author, authorName, blogComment };
    const response = await addComment(newComment);
    if (response === "error") {
      alert("Empty comment can not be added");
    } else {
      setComments(response);
    }
  };
  useEffect(() => {
    (async () => {
      setComments(await getBlogComments(blogId));
    })();
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
        {loggedIn && (
          <div id="circle-avatar" className="text-center mb-4 ">
            <span>{user?.name[0]}</span>
          </div>
        )}
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
        {comments?.map((comment) => {
          return (
            <div className="comment-section">
              <div id="circle-avatar" className="text-center mb-4">
                <span>{comment.Author?.at(0)}</span>
              </div>
              <div className="comment-content">{comment?.Comment}</div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
