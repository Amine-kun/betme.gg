import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

  export default AuthContext;

  export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
      localStorage.getItem("authTokens")
        ? JSON.parse(localStorage.getItem("authTokens"))
        : null
    );
    const [user, setUser] = useState(() =>
      localStorage.getItem("authTokens")
        ? jwt_decode(localStorage.getItem("authTokens"))
        : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (loginData) => {
      const response = await fetch("http://ec2-18-212-17-243.compute-1.amazonaws.com/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username:loginData.username,
          password:loginData.password
        })
      });
      const data = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        navigate("/");
        return true;
      } else {
        return false 
      }
    };
    
    const registerUser = async (registerData) => {
      let options = {
        method:'POST',
        url : 'http://ec2-18-212-17-243.compute-1.amazonaws.com/api/register/',
        headers:{'Content-Type':'application/json'},
        data : registerData
      }
      axios.request(options)
        .then((res)=>{
          return true
          })
        .catch((err)=>{return false})
    };

    const logoutUser = () => {
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");
      navigate('/betme')
    };

    const contextData = {
      user,
      setUser,
      authTokens,
      setAuthTokens,
      registerUser,
      loginUser,
      logoutUser
    };

    useEffect(() => {
      if (authTokens) {
        setUser(jwt_decode(authTokens.access));
      }
      setLoading(false);
    }, [authTokens, loading]);

    return (
      <AuthContext.Provider value={contextData}>
        {loading ? null : children}
      </AuthContext.Provider>
    );
  };