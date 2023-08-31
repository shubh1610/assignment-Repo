import React, { useContext, useEffect, useState } from "react";
import { Home } from "./blog/Home";
import { ShowBlog } from "./blog/ShowBlog";
import { AddBlog } from "./blog/AddBlog";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Callback } from "./Callback";
import { AuthContextProvider, AuthContext } from "./context";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { loggedIn, user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:user" element={<Home />} />
          <Route path="/showblog/:id" element={<ShowBlog />} />
          <Route
            path="/addblog"
            element={
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            }
          />
          <Route path="/oauth2callback" element={<Callback />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
