import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = 'http://165.232.108.134';

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);
  const getAccess = () =>{
  const accessToken = localStorage.getItem("authTokens")
                      ? JSON.parse(localStorage.getItem("authTokens"))
                      : null 
    return accessToken;
  }

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `JWT ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use((config) => {
    let token = getAccess();
    config.headers.Authorization = `JWT ${token.access}`;
    return config
  }, (error)=>{
      return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(
    (res)=>{
      return res;
    },
    async(err)=>{
      const originalConfig = err.config;
      const refToken = getAccess();
      
        if(err.response){
        if(err.response.status === 401 && !originalConfig._retry){
          originalConfig._retry = true;
            try{

              const refresh = await axios.post(`${baseURL}/api/token/refresh/`,{
                refresh: refToken.refresh
              })
              localStorage.setItem("authTokens", JSON.stringify(refresh.data));
              originalConfig.headers.Authorization = `JWT ${refresh.data.access}`;
              setAuthTokens(refresh.data);
              setUser(jwt_decode(refresh.data))

              return axiosInstance(originalConfig);

            } catch(err){
              return Promise.reject(err)
            }
        }
      }
      return Promise.reject(err)
    })

  return axiosInstance;
};

export default useAxios;