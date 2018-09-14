import axios from 'axios';

export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
function signinFailure(error) {
    return {
        type: SIGN_IN_FAILURE,
        payload: {
            error
        }
    }
}

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
function signinRequest(credentials) {
    return {
        type: SIGN_IN_REQUEST,
    }
}

export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
function signinSuccess(json) {
    return {
        type: SIGN_IN_SUCCESS,
        userData: json
    }
}

export const userSignInRequest = (credentials) => {
    return dispatch => {
        dispatch(signinRequest());

        axios.post('/api/users/signin', credentials)
            .then(res => {
                dispatch(signinSuccess(res.data));
            })
            .catch(err => {
                dispatch(signinFailure(err.message));
            });
    };
};
