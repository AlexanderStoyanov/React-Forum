import axios from 'axios';

export function userSignInRequest(userData) {
    return dispatch => {
        return axios.post('/api/users/signin', userData);
    }
}