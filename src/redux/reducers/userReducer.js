
import { USER_SIGNUP_REQUEST, USER_SIGNUP_FAIL, USER_SIGNUP_RESET, 
    USER_SIGNUP_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, 
    USER_SIGNIN_FAIL, USER_SIGNIN_RESET, USER_LOGOUT_SUCCESS, 
    USER_LOGOUT_FAIL, USER_LOGOUT_RESET, USER_LOGOUT_REQUEST, 
    CONFIRM_REQUEST, CONFIRM_SUCCESS, CONFIRM_FAIL, PASSWORD_FORGOT_REQUEST, 
    PASSWORD_FORGOT_SUCCESS, PASSWORD_FORGOT_FAIL, PASSWORD_FORGOT_RESET, 
    PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL, 
    PASSWORD_RESET_RESET } from "../constants/userConstant";


//sign up
export const userReducerSignUp =(state={}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return{
                loading: true,
                isAuthenticated: false}
        case USER_SIGNUP_SUCCESS:
            return{
                loading: false,
                userSignUp: action.payload,
                isAuthenticated: true
            }
        case USER_SIGNUP_FAIL:
            return{ 
                loading: false,
                error: action.payload,
                isAuthenticated: false
            }
        case USER_SIGNUP_RESET:
            return{}

        default:
           return state;
    }
}

//email confirmation
export const userReducerEmailConfirmation =(state={}, action) => {
    switch (action.type) {
        case CONFIRM_REQUEST:
            return{
                loading: true, 
                userInfo: null, 
                isAuthenticated: false}
        case CONFIRM_SUCCESS:
            return{
                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case CONFIRM_FAIL:
            return{ 
                loading: false,
                userInfo: null,
                isAuthenticated: false,
                error: action.payload
            }
        case USER_SIGNUP_RESET:
            return{}

        default:
           return state;
    }
}


//sign in
export const userReducerSignIn =(state={}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return{
                loading: true, 
                userInfo: null, 
                isAuthenticated: false}
        case USER_SIGNIN_SUCCESS:
            return{
                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case USER_SIGNIN_FAIL:
            return{ 
                loading: false,
                userInfo: null,
                isAuthenticated: false,
                error: action.payload
            }
        case USER_SIGNIN_RESET:
            return{}
            
        default:
           return state;
    }
}


//log out
export const userReducerLogout =(state={}, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return{ loading: true }
        case USER_LOGOUT_SUCCESS:
            return{
                loading: false,
                user: action.payload,}
        case USER_LOGOUT_FAIL:
            return{ 
                loading: false,
                error: action.payload}
        case USER_LOGOUT_RESET:
            return{}
        default:
           return state;
    }
}


//forgot password
export const userReducerPasswordForgot =(state={}, action) => {
    switch (action.type) {
        case PASSWORD_FORGOT_REQUEST:
            return{ loading: true ,
                    isAuthenticated: false}
        case PASSWORD_FORGOT_SUCCESS:
            return{
                loading: false,
                user: action.payload,
                isAuthenticated: true}
        case PASSWORD_FORGOT_FAIL:
            return{ 
                loading: false,
                error: action.payload,
                isAuthenticated: false}
        case PASSWORD_FORGOT_RESET:
            return{}
        default:
           return state;
    }
}


//reset password
export const userReducerPasswordReset =(state={}, action) => {
    switch (action.type) {
        case PASSWORD_RESET_REQUEST:
            return{ loading: true,
                isAuthenticated: false }
        case PASSWORD_RESET_SUCCESS:
            return{
                loading: false,
                user: action.payload,
                isAuthenticated: true}
        case PASSWORD_RESET_FAIL:
            return{ 
                loading: false,
                error: action.payload,
                isAuthenticated: false}
        case PASSWORD_RESET_RESET:
            return{}
        default:
           return state;
    }
}



