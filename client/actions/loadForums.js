import axios from 'axios';

export const FORUMS_REQUEST_FAILURE = 'FORUMS_REQUEST_FAILURE';
function postFailure(error) {
    return {
        type: FORUMS_REQUEST_FAILURE,
        payload: {
            error
        }
    }
}

export const REQUEST_FORUMS = 'REQUEST_FORUMS';
function requestForums() {
    return {
        type: REQUEST_FORUMS,
    }
}

export const RECEIVE_FORUMS = 'RECEIVE_FORUMS';
function receiveForums(json) {
    return {
        type: RECEIVE_FORUMS,
        forums: json,
        receivedAt: Date.now()
    }
}

export const loadForums = () => {
    return dispatch => {
        dispatch(requestForums());

        axios.get('/api/forums/load')
            .then(res => {
                //console.log(res);
                dispatch(receiveForums(res.data.payload));
            })
            .catch(err => {
                //console.log(err);
                dispatch(postFailure(err.message));
            });
    };
};