import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AuthContext = createContext();

  export default AuthContext;

const BASE_URL = 'https://www.api-arcadia.me';

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
    const [userData, setUserData] = useState(()=>
      localStorage.getItem("userinfo")
        ? JSON.parse(localStorage.getItem("userinfo"))
        : null
      );

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const getUserData = async (token)=>{
      let options = {
        method:'GET',
        url : `${BASE_URL}/api/user/`,
        headers:{'Content-Type':'application/json', Authorization :`JWT ${token}`},
      }
      axios.request(options)
        .then((res)=>{
          localStorage.setItem("userinfo", JSON.stringify(res.data.userData));
          setUserData(res.data.userData)
          let some = localStorage.getItem("userinfo")
                  ? JSON.parse(localStorage.getItem("userinfo"))
                  : null
          if(some?.main_id){
            navigate('/')
          }
          })
        .catch((err)=>{console.log(err.response.data)}) 
    }

    const loginUser = async (loginData) => {
      const response = await fetch(`${BASE_URL}/api/token/`, {
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
        getUserData(data.access)
        setAuthTokens(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        return true;
      } else {
        return false 
      }
    };
    
    const registerUser = async (registerData) => {
      let options = {
        method:'POST',
        url : `${BASE_URL}/api/register/`,
        headers:{'Content-Type':'application/json'},
        data : registerData
      }
      const create = await axios.request(options);

      if(create.status === 200){
        return true;
      } else {
        return false
      }
        
    };

    const logoutUser = () => {
      setAuthTokens(null);
      setUser(null);
      setUserData(null);
      localStorage.removeItem("userinfo");
      localStorage.removeItem("partystatus");
      localStorage.removeItem("authTokens");
      navigate('/squidstacks')
    };

    const contextData = {
      user,
      userData,
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