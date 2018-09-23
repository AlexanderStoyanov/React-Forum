import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

export const REQUEST_RENAME = 'REQUEST_FORUMS';
export const RECEIVE_RENAME = 'RECEIVE_FORUMS';
export const FORUM_RENAME_FAILURE = 'FORUMS_REQUEST_FAILURE';
export const renameForum = (forumid, newName) => {
    return dispatch => {
        dispatch(request(REQUEST_RENAME));

        axios.post('/api/forums/rename', { forumid: forumid, newForumName: newName })
            .then(res => {
                dispatch(receive(RECEIVE_RENAME, res.data.payload));
            })
            .catch(err => {
                dispatch(error(FORUM_RENAME_FAILURE, err.message));
            });
    };
};

export const ADD_FORUM_REQUEST = 'ADD_FORUM_REQUEST';
export const ADD_FORUM_SUCCESS = 'ADD_FORUM_SUCCESS';
export const ADD_FORUM_FAILURE = 'ADD_FORUM_FAILURE';
export const addForum = (forumName) => {
    return dispatch => {
        dispatch(request(ADD_FORUM_REQUEST));

        axios.post('/api/forums/add', { forumName: forumName })
            .then(res => {
                console.log(res);
                dispatch(receive(ADD_FORUM_SUCCESS, res.status));
            })
            .catch(err => {
                console.log(err);
                dispatch(error(ADD_FORUM_FAILURE, err.message));
            });
    };
};

export const REQUEST_DELETE = 'REQUEST_DELETE';
export const RECEIVE_DELETE = 'RECEIVE_DELETE';
export const FORUM_DELETE_FAILURE = 'FORUM_DELETE_FAILURE';
export const deleteForum = (forumid) => {
    return dispatch => {
        dispatch(request(REQUEST_DELETE));

        axios.post('/api/forums/delete', { forumid: forumid })
            .then(res => {
                dispatch(receive(RECEIVE_DELETE, res.data.payload));
            })
            .catch(err => {
                dispatch(error(FORUM_DELETE_FAILURE, err.message));
            });
    };
};

export const REQUEST_FORUMS = 'REQUEST_FORUMS';
export const RECEIVE_FORUMS = 'RECEIVE_FORUMS';
export const FORUMS_REQUEST_FAILURE = 'FORUMS_REQUEST_FAILURE';

export const loadForums = () => {
    return dispatch => {
        dispatch(request(REQUEST_FORUMS));

        axios.get('/api/forums/load')
            .then(res => {
                dispatch(receive(RECEIVE_FORUMS, res.data.payload));
            })
            .catch(err => {
                dispatch(error(FORUMS_REQUEST_FAILURE, err.message));
            });
    };
};

export const EDIT_FORUM = 'EDIT_FORUM';
export const loadCurrentForumID = (currentForumID) => {
    return {
        type: EDIT_FORUM,
        payload: {
            currentForumID: currentForumID,
        }
    };
};