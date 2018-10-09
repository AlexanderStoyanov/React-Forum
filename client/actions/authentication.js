import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

//Sign in attempt
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const userSignInRequest = (credentials) => {
    return async dispatch => {
        dispatch(request(SIGN_IN_REQUEST));
        try {
            let res = await axios.post('/api/users/signin', credentials);
            dispatch(receive(SIGN_IN_SUCCESS, res.data));
        } catch (err) {
            dispatch(error(SIGN_IN_FAILURE, err.message));
        }
    };
};

//Sign up attempt
export function userSignUpRequest(userData) {
    return dispatch => {
        return axios.post('/api/users/signup', userData);
    }
}

//Determines if a username is already taken
export function doesUserExist(identifier) {
    return dispatch => {
        return axios.get(`/api/users/${identifier}`);
    }
}