import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';

export const userSignInRequest = (credentials) => {
    return dispatch => {
        dispatch(request(SIGN_IN_REQUEST));

        axios.post('/api/users/signin', credentials)
            .then(res => {
                dispatch(receive(SIGN_IN_SUCCESS, res.data));
            })
            .catch(err => {
                dispatch(error(SIGN_IN_FAILURE, err.message));
            });
    };
};
