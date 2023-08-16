import "../styles.scss";
import { PopupMenu } from "react-simple-widgets";
import { AuthContext } from "../context";
import { useContext } from "react";

import axios from "axios";

const serverUrl = "http://localhost:8080/"

export default function Profile() {

  const { loggedIn, logOut, setGetProfileBlog, user, getUserPost } = useContext(AuthContext);
  const handleLogin = () => {
    axios.get(serverUrl + 'auth/google/url')
      .then(res => window.location.assign(res.data))
      .catch(err => console.log(err, "Error"))
  }
  return (
    <div id="app">
      <div className="text-end">
        {!loggedIn ? <button onClick={handleLogin}>Login</button> :
          <PopupMenu>
            <button className="btn btn-primary">
              <small>My Profile</small>
            </button>

            <div className="card text-start">
              <div className="card-body px-4 py-4">
                <div id="circle-avatar" className="text-center mx-auto mb-4">
                  <span>K</span>
                </div>

                <h5 className="text-center mb-0">{user.name}</h5>
                <p className="text-center mb-2">{user.email}</p>

                <hr />

                <p
                  className="mb-0"
                  style={{ color: "#bebebe", fontWeight: "bold", fontSize: 12 }}
                >
                  ROLES
                </p>
                <p style={{ fontSize: 12 }}>
                  {["Author", "Blog-Writer"].join(
                    ", "
                  )}
                </p>

                <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

                <div
                  className="list-group list-group-flush"
                  style={{ margin: "0 -24px 0" }}
                >
                  <button className="list-group-item list-group-item-action px-4" onClick={() => {
                    setGetProfileBlog(true); getUserPost();
                  }}>
                    <small>My Blogs</small>
                  </button>
                </div>

                <hr style={{ margin: "0 -24px 24px" }} />

                <div className="d-grid">
                  <button className="btn btn-secondary" onClick={() => { logOut() }}>
                    <small>Logout</small>
                  </button>
                </div>
              </div>
            </div>
          </PopupMenu>
        }
      </div>
    </div>
  );
}
