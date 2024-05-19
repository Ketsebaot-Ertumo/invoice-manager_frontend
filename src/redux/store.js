import { combineReducers, applyMiddleware, createStore } from "redux";
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducerEmailConfirmation, userReducerLogout, userReducerPasswordForgot, userReducerPasswordReset, userReducerSignIn, userReducerSignUp } from "./reducers/userReducer";
import { jwtDecode } from 'jwt-decode';

// Combine reducers
const reducer = combineReducers({
  signUp: userReducerSignUp,
  signIn: userReducerSignIn,
  logOut: userReducerLogout,
  confirm: userReducerEmailConfirmation,
  forgot: userReducerPasswordForgot,
  reset: userReducerPasswordReset,
});

// Function to retrieve the token from cookies
const getTokenFromCookie = () => {
  if (typeof window !== 'undefined') {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    console.log('cookies', cookies)
    const tokenCookie = cookies.find((cookie) => cookie.startsWith('token='));

    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }
  }

  return null;
};

const token = getTokenFromCookie()
console.log('token:', token)

// const decodedToken = jwtDecode(token);
const decodedToken = token ? jwtDecode(token) : null;

// Initial state
const initialState = {
  signIn: {
    userInfo: {
      id: decodedToken ? decodedToken.id : null,
      role: decodedToken ? decodedToken.role : null,
      token
    }
  },
};

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

