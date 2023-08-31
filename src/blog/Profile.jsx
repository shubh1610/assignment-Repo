import "../styles.scss";
import { handle_auth } from "../Services";
import { AuthContext } from "../context";
import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function Profile() {
  const { loggedIn, logOut, setGetProfileBlog, user, getUserPost } =
    useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogin = () => {
    handle_auth()
      .then((response) => window.location.assign(response.data))
      .catch((err) => console.log(err, "Error"));
  };
  return (
    <div id="app">
      <div className="text-end">
        {!loggedIn ? (
          <button onClick={handleLogin}>Login</button>
        ) : (
          <>
            <Button variant="primary" onClick={handleShow}>
              My Profile
            </Button>

            <Modal
              show={show}
              onHide={handleClose}
              animation={false}
              size="lg"
              centered={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                  {["Author", "Blog-Writer"].join(", ")}
                </p>

                <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

                <p
                  className="mb-0"
                  style={{
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleClose();
                    setGetProfileBlog(true);
                    getUserPost();
                  }}
                >
                  My Blogs
                </p>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    handleClose();
                    logOut();
                  }}
                  style={{ width: "100%" }}
                >
                  <small>Logout</small>
                </button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}
