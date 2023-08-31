import { serverUrl } from "./context";

export function user_loggedIn(token) {
  const response = fetch(serverUrl + "/auth/logged_in", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: { token },
    }),
  }).then((response) => {
    return response.json();
  });

  return response;
}

export function user_logout() {
  const response = fetch(serverUrl + "/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
  return response;
}

export function get_blogs() {
  const response = fetch(serverUrl + "/getblogs").then((response) => {
    return response.json();
  });
  return response;
}

export function getBlogsById(user) {
  const response = fetch(serverUrl + `/getblogsbyid/${user["_id"]}`).then(
    (response) => {
      return response.json();
    }
  );
  return response;
}

export async function addComment(newComment) {
  const options = {
    method: "POST",
    body: JSON.stringify(newComment),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(serverUrl + "/comment/addComment", options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Empty comment");
    })
    .catch((err) => "error");
  return response;
}

export async function getBlogComments(blogId) {
  var response = await fetch(serverUrl + `/comment/getComments/${blogId}`)
    .then((res) => res.json())
    .catch((err) => []);
  return response;
}

export function get_authToken() {
  const response = fetch(serverUrl + "/auth/token" + window.location.search, {
    withCredentials: true,
  }).then((res) => {
    return res.json();
  });
  return response;
}

export function addBlog(newData) {
  const response = fetch(serverUrl + "/addblog", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Empty comment");
    })
    .catch((err) => "error");
  return response;
}

export function handle_auth() {
  const response = fetch(serverUrl + "/auth/google/url").then((response) => {
    return response;
  });
  return response;
}
