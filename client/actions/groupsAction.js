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

export const REQUEST_ADD_GROUP = 'REQUEST_ADD_GROUP';
export const RECEIVE_ADD_GROUP = 'RECEIVE_ADD_GROUP';
export const GROUP_ADD_FAILURE = 'GROUP_ADD_FAILURE';
export const addGroup = (newGroupName) => {
    return dispatch => {
        dispatch(request(REQUEST_ADD_GROUP));

        axios.post('/api/groups/add', {newGroupName: newGroupName})
            .then(res => {
                dispatch(receive(RECEIVE_ADD_GROUP, res.data));
            })
            .catch(err => {
                dispatch(error(GROUP_ADD_FAILURE, err.message));
            });
    };
};