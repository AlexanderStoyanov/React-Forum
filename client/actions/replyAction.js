import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

//Loads replies @init
export const REQUEST_REPLIES = 'REQUEST_REPLIES';
export const RECEIVE_REPLIES = 'RECEIVE_REPLIES';
export const REPLIES_REQUEST_FAILURE = 'REPLIES_REQUEST_FAILURE';
export const loadReplies = (id) => {
    return async dispatch => {
        dispatch(request(REQUEST_REPLIES));
        try {
            let res = await axios.get('/api/replies/load', { params: { id: id }, });
            dispatch(receive(RECEIVE_REPLIES, res.data.payload));
        } catch (err) {
            dispatch(error(REPLIES_REQUEST_FAILURE, err.message));
        }
    };
};

//Adds new reply to a topic
export const ADD_REPLY_REQUEST = 'ADD_REPLY_REQUEST';
export const ADD_REPLY_REPLY = 'ADD_REPLY_REPLY';
export const ADD_REPLY_FAILURE = 'ADD_REPLY_FAILURE';
export const postReply = (userDetails) => {
    return async dispatch => {
        dispatch(request(ADD_REPLY_REQUEST));
        try {
            let res = await axios.post('/api/replies/post', userDetails);
            dispatch(receive(ADD_REPLY_REPLY, res.status));
        } catch (err) {
            dispatch(error(ADD_REPLY_FAILURE, err.message));
        }
    };
};

//Deletes existing reply
export const REQUEST_DELETE_REPLY = 'REQUEST_DELETE_REPLY';
export const RECEIVE_DELETE_REPLY = 'RECEIVE_DELETE_REPLY';
export const REPLY_DELETE_FAILURE = 'REPLY_DELETE_FAILURE';
export const deleteReply = (replyid) => {
    return async dispatch => {
        dispatch(request(REQUEST_DELETE_REPLY));
        try {
            let res = await axios.post('/api/replies/delete', { replyid: replyid });
            dispatch(receive(RECEIVE_DELETE_REPLY, res.status));
        } catch (err) {
            dispatch(error(REPLY_DELETE_FAILURE, err.message));
        }
    };
};

//Edits (updates) existing reply
export const REQUEST_UPDATE_REPLY = 'REQUEST_UPDATE_REPLY';
export const RECEIVE_UPDATE_REPLY = 'RECEIVE_UPDATE_REPLY';
export const REPLY_UPDATE_FAILURE = 'REPLY_UPDATE_FAILURE';
export const updateReply = (replyData) => {
    return async dispatch => {
        dispatch(request(REQUEST_UPDATE_REPLY));
        try {
            let res = axios.post('/api/replies/update', replyData);
            dispatch(receive(RECEIVE_UPDATE_REPLY, res.status));
        } catch (err) {
            dispatch(error(REPLY_UPDATE_FAILURE, err.message));
        }
    };
};

//Stores current reply id in the userDetails instance of store
export const EDIT_REPLY = 'EDIT_REPLY';
export const loadCurrentReplyID = (currentReplyID) => {
    return {
        type: EDIT_REPLY,
        payload: {
            currentReplyID: currentReplyID,
        }
    };
};