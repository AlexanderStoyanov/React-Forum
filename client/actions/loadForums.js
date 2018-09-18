import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

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