import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';
export const GROUPS_REQUEST_FAILURE = 'GROUPS_REQUEST_FAILURE';
export const loadGroups = () => {
    return dispatch => {
        dispatch(request(REQUEST_GROUPS));

        axios.get('/api/groups/load')
            .then(res => {
                dispatch(receive(RECEIVE_GROUPS, res.data));
            })
            .catch(err => {
                dispatch(error(GROUPS_REQUEST_FAILURE, err.message));
            });
    };
};