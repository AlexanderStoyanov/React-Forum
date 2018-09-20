import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

export const REQUEST_RENAME = 'REQUEST_FORUMS';
export const RECEIVE_RENAME = 'RECEIVE_FORUMS';
export const FORUMS_RENAME_FAILURE = 'FORUMS_REQUEST_FAILURE';

export const renameForum = (forumid, newName) => {
    return dispatch => {
        dispatch(request(REQUEST_RENAME));

        axios.post('/api/forums/rename', { forumid: forumid, newForumName: newName })
            .then(res => {
                dispatch(receive(RECEIVE_RENAME, res.data.payload));
            })
            .catch(err => {
                dispatch(error(FORUMS_RENAME_FAILURE, err.message));
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