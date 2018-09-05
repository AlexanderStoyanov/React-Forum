import axios from 'axios';

export const REPLIES_REQUEST_FAILURE = 'REPLIES_REQUEST_FAILURE';
function postFailure(error) {
    return {
        type: REPLIES_REQUEST_FAILURE,
        payload: {
            error
        }
    }
}

export const REQUEST_REPLIES = 'REQUEST_REPLIES';
function requestReplies(directory) {
    return {
        type: REQUEST_REPLIES,
        directory: directory
    }
}

export const RECEIVE_REPLIES = 'RECEIVE_REPLIES';
function receiveReplies(json) {
    return {
        type: RECEIVE_REPLIES,
        replies: json,
        receivedAt: Date.now()
    }
}

export const loadReplies = (id) => {
    return dispatch => {
        dispatch(requestReplies(id));

        axios.get('/api/replies/load', {
            params: {
                id: id
            },
        })
            .then(res => {
                dispatch(receiveReplies(res.data.payload));
            })
            .catch(err => {
                dispatch(postFailure(err.message));
            });
    };
};