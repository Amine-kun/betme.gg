import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// const baseURL = "http://ec2-18-212-17-243.compute-1.amazonaws.com";
const baseURL = 'http://localhost:8000';

const useAxios = () => {
  console.log('check')
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log(req)
    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: authTokens.refresh
    });

    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    console.log('2', req)
    return req;
  });

  return axiosInstance;
};

export default useAxios;