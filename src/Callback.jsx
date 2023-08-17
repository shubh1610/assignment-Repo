import { useEffect, useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, serverUrl } from "./context";
import axios from "axios";

export const Callback = () => {
  const called = useRef(false);
  const [test, setTest] = useState(false);
  const { checkLoginState, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (test) {
      (async () => {
        if (loggedIn === false) {
          try {
            called.current = true;
            await axios.get(
              `${serverUrl}/auth/token${window.location.search}`,
              {
                withCredentials: true,
              }
            );

            checkLoginState();
            navigate("/");
          } catch (err) {
            console.error(err, "err");
            navigate("/");
          }
        } else if (loggedIn === true) {
          navigate("/");
        }
      })();
    } else {
      setTest(true);
    }
  }, [navigate, test]);
  return <></>;
};
