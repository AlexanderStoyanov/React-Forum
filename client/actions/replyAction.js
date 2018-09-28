import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

export function postReply(replyData) {
    return dispatch => {
        return axios.post('/api/replies/post', replyData);
    }
}


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