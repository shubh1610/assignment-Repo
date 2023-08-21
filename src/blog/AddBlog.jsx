import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../form.scss";
import { AuthContext, serverUrl } from "../context";
export const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const { register, watch, handleSubmit } = useForm();
  const title = watch("blogTitle");
  const navigate = useNavigate();
  const content = watch("blogContent");

  const onSubmit = () => {
    const author = user.email;
    const authorName = user.name;
    const newData = { title, author, authorName, content };
    axios
      .post(serverUrl + "/addblog", newData)
      .then((res) => console.log(res, "res"))
      .catch((err) => console.log(err, "err"));
    navigate("/");
  };

  return (
    <div id="add-blog">
      <div className="add-blog-text">
        <text>Create your own blog</text>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="form-row">
          <label for="UserName">Title</label>
          <input
            type="text"
            placeholder="Add title"
            {...register("blogTitle")}
          ></input>
        </div>
        <div class="form-row">
          <label for="textArea">Blog</label>
          <textarea
            name="textArea"
            id="textArea"
            cols="3"
            placeholder="Post what is on your mind!!!!"
            {...register("blogContent")}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
