import { toast } from "react-toastify";
import axios from 'axios';
import { USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL, USER_SIGNIN_FAIL, 
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_REQUEST, 
    USER_SIGNUP_SUCCESS, CONFIRM_REQUEST, CONFIRM_SUCCESS, CONFIRM_FAIL, PASSWORD_FORGOT_REQUEST, 
    PASSWORD_FORGOT_SUCCESS, PASSWORD_FORGOT_FAIL, PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, 
    PASSWORD_RESET_FAIL,  } from "../constants/userConstant"


    const URL = process.env.NEXT_PUBLIC_API_URL;

    // Create a global Axios instance with the desired default configuration
    axios.defaults.withCredentials = true;


//sign up action
export const userSignUpAction = (user) => async(dispatch) =>{
    dispatch({type: USER_SIGNUP_REQUEST});
    try{
        const {data} = await  axios.post(`${URL}/auth/signup`, user);
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully.");
    }catch(error){
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.message
        });
        toast.error(error.response.data.message || 'Failed to register!');
    }
}

//Confirm email
export const confirmEmail = (confirmationCode) => async (dispatch) => {
    dispatch({type: CONFIRM_REQUEST});
    try{
        const response= await axios.post(`${process.env.URL}/auth/confirm`, {confirmationCode});
        dispatch({
            type: CONFIRM_SUCCESS, 
            payload: response.data
    });
    }catch(error){
        dispatch({
            type: CONFIRM_FAIL,
            payload: error.response.data
        });
    }
};


//sign in action
export const userSignInAction = (user) => async(dispatch) =>{
    dispatch({type: USER_SIGNIN_REQUEST});
    try{
        const {data} = await  axios.post(`${process.env.URL}/auth/signin`, user);
        // localStorage.setItem('userInfo', JSON.stringify(data));

        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Log In Successfully.");
    }catch(error){
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.message
        });
        toast.error(error.response.data.message || 'Fail to signin.');
    }
}


//user logout action
export const userLogoutAction = (user) => async(dispatch) =>{
    dispatch({type: USER_LOGOUT_REQUEST});
    try{
        const {data} = await  axios.get(`${process.env.URL}/auth/logout`);
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log Out Successfully");
    }catch(error){
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.message);
    }
}


//forgot email
export const forgot = (user) => async (dispatch) => {
    dispatch({type: PASSWORD_FORGOT_REQUEST});
    try{
        const response= await axios.post(`${process.env.URL}/auth/forgot`, user);
        dispatch({
            type: PASSWORD_FORGOT_SUCCESS, 
            payload: response.data
    });
        toast.success("Successfully Sent Reset Link.");

    }catch(error){
        dispatch({
            type: PASSWORD_FORGOT_FAIL,
            payload: error.response.data
        });
        toast.error(error.response.data.message);
    }
};


//reset email
export const reset = (user) => async (dispatch) => {
    dispatch({type: PASSWORD_RESET_REQUEST});
    try{
        const response= await axios.post(`${process.env.URL}/auth/reset`, user);
        dispatch({
            type: PASSWORD_RESET_SUCCESS, 
            payload: response.data
    });
    toast.success("Successfully Reset Password.");

    }catch(error){
        dispatch({
            type: PASSWORD_RESET_FAIL,
            payload: error.response.data
        });
        toast.error(error.response.data.message);
    }
};


