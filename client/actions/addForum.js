import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

export const ADD_FORUM_REQUEST = 'ADD_FORUM_REQUEST';
export const ADD_FORUM_SUCCESS = 'ADD_FORUM_SUCCESS';
export const ADD_FORUM_FAILURE = 'ADD_FORUM_FAILURE';

export const addForum = () => {
    return dispatch => {
        dispatch(request(ADD_FORUM_REQUEST));

        axios.post('/api/forums/add')
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