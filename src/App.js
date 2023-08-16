import React from "react";
import { Blogs } from './blog/Blogs';
import { ShowBlog } from "./blog/ShowBlog";
import { AddBlog } from './blog/AddBlog';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Callback } from "./Callback";
import { AuthContextProvider } from "./context";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/:user" element={<Blogs />} />
          <Route path="/showblog/:id" element={<ShowBlog />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/oauth2callback" element={<Callback />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
