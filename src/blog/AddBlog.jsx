import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { addBlog } from "../Services";
import { useNavigate, Link } from "react-router-dom";
import "../form.scss";
import { AuthContext } from "../context";
export const AddBlog = () => {
  const { user } = useContext(AuthContext);
  const { register, watch, handleSubmit } = useForm();
  const title = watch("blogTitle");
  const navigate = useNavigate();
  const content = watch("blogContent");

  const onSubmit = async () => {
    const userId = user["_id"];
    const newData = { title, userId, content };
    const response = await addBlog(newData);
    if (response === "error") {
      alert("Empty blog can not be added");
    } else {
      navigate("/");
    }
  };

  return (
    <div id="add-blog">
      <Link to="/">Back to Home</Link>
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
