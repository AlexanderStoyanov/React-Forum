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