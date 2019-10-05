import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from "axios";

// Register User

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/users/register", userData)
    .then(res => history.push("/login"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Login  Get user Token

export const loginUser = userData => dispatch => {
  axios
    .post("/users/login", userData)
    .then(res => {
      //Save to localstorage
      const { token } = res.data;

      //Set Token to LocalStorage
      localStorage.setItem("jwtToken", token);

      //Set Token to Auth Header
      setAuthToken(token);

      //Decode Token to get user data
      const decode = jwt_decode(token);

      //Set current user
      dispatch(setCurrentUser(decode));
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = (decode) =>{
    return{
        type: SET_CURRENT_USER,
        payload: decode
    }
}

//Log user out
export const logoutUser = () => dispatch => {
  
  //Remove Token from localStorage
  localStorage.removeItem('jwtToken');

  //Remove auth header
  setAuthToken(false);

  //Redirect user to login page
  window.location.href = '/login';

  //Set current user to empty {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
}