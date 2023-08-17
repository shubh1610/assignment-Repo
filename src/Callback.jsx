import { useEffect,useContext,useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, serverUrl } from "./context";
import Cookies from 'universal-cookie';
import axios from "axios";
const cookies = new Cookies();

export const Callback = () => {
    const called = useRef(false);
    const [test, setTest]=useState(false);
    const { checkLoginState, loggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(test){
      (async () => {
        if (loggedIn === false) {
          try {
            called.current = true;
            const res =await axios.get(`${serverUrl}/auth/token${window.location.search}`,{
              withCredentials:true
            })
            console.log('response: ', res);
            cookies.set('token', res.data)
            checkLoginState();
            navigate('/');
          } catch (err) {
            console.error(err,'err');
            navigate('/');
          }
        } else if (loggedIn === true) {
          navigate('/');
        }
      })();
    }
    else{
        setTest(true);
    }
    }, [navigate,test])
    return <></>
  };