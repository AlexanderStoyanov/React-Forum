import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

export const REQUEST_REPLIES = 'REQUEST_REPLIES';
export const RECEIVE_REPLIES = 'RECEIVE_REPLIES';
export const REPLIES_REQUEST_FAILURE = 'REPLIES_REQUEST_FAILURE';

export const loadReplies = (id) => {
    return dispatch => {
        dispatch(request(REQUEST_REPLIES));

        axios.get('/api/replies/load', {
            params: {
                id: id
            },
        }).then(res => {
            dispatch(receive(RECEIVE_REPLIES, res.data.payload));
        }).catch(err => {
            dispatch(error(REPLIES_REQUEST_FAILURE, err.message));
        });
    };
};

export const ADD_REPLY_REQUEST = 'ADD_REPLY_REQUEST';
export const ADD_REPLY_REPLY = 'ADD_REPLY_REPLY';
export const ADD_REPLY_FAILURE = 'ADD_REPLY_FAILURE';
export const postReply = (userDetails) => {
    return dispatch => {
        dispatch(request(ADD_REPLY_REQUEST));

        axios.post('/api/replies/post', userDetails)
            .then(res => {
                dispatch(receive(ADD_REPLY_REPLY, res.status));
            })
            .catch(err => {
                dispatch(error(ADD_REPLY_FAILURE, err.message));
            });
    };
};

export const REQUEST_DELETE_REPLY = 'REQUEST_DELETE_REPLY';
export const RECEIVE_DELETE_REPLY = 'RECEIVE_DELETE_REPLY';
export const REPLY_DELETE_FAILURE = 'REPLY_DELETE_FAILURE';
export const deleteReply = (replyid) => {
    return dispatch => {
        dispatch(request(REQUEST_DELETE_REPLY));

        axios.post('/api/replies/delete', { replyid: replyid })
            .then(res => {
                dispatch(receive(RECEIVE_DELETE_REPLY, res.status));
            })
            .catch(err => {
                dispatch(error(REPLY_DELETE_FAILURE, err.message));
            });
    };
};