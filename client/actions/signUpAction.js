import axios from 'axios';

export function userSignUpRequest(userData) {
    return dispatch => {
        return axios.post('/api/users', userData);
    }
}

export function doesUserExist(identifier) {
    return dispatch => {
        return axios.get(`/api/users/${identifier}`);
    }
}