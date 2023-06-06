import axios from "axios";
import { SET_CURRENT_USER, BASE_URL } from "./constants";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { AppDispatch } from "../app/store";
import { TypeRegisterData, TypeLoginData, TypeTokenData } from "./actionType";

export const registerUser =
  (userdata: TypeRegisterData) => (dispatch: AppDispatch) => {
    axios
      .post(`${BASE_URL}/api/users/register`, userdata)
      .then((res) => {
        // console.log(res);
        
        const navigate = useNavigate();
        navigate("/login");
      })
      .catch((err) => {});
  };

export const loginUser =
  (userdata: TypeLoginData) => (dispatch: AppDispatch) => {
    axios
      .post(`${BASE_URL}/api/users/login`, userdata)
      .then((res) => {
        localStorage.setItem("token", res.data);
        const decoded: TypeTokenData = jwtDecode(res.data);
        dispatch(setCurrntUser(decoded));
        const navigate = useNavigate();
        navigate("/dashboard");
      })
      .catch((err) => {});
  };

export const logoutUser = () => (dispatch: AppDispatch) => {
  console.log('logout is active');
  
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const setCurrntUser = (decoded: TypeTokenData) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
