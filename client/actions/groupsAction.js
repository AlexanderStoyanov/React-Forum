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

export const REQUEST_DELETE = 'REQUEST_DELETE';
export const RECEIVE_DELETE = 'RECEIVE_DELETE';
export const GROUP_DELETE_FAILURE = 'GROUP_DELETE_FAILURE';
export const deleteGroup = (groupid) => {
    return dispatch => {
        dispatch(request(REQUEST_DELETE));

        axios.post('/api/groups/delete', { groupid: groupid })
            .then(res => {
                dispatch(receive(RECEIVE_DELETE, res.data.payload));
            })
            .catch(err => {
                dispatch(error(GROUP_DELETE_FAILURE, err.message));
            });
    };
};

export const REQUEST_RENAME = 'REQUEST_GROUPS';
export const RECEIVE_RENAME = 'RECEIVE_GROUPS';
export const GROUP_RENAME_FAILURE = 'GROUPS_REQUEST_FAILURE';
export const renameGroup = (groupid, newName) => {
    return dispatch => {
        dispatch(request(REQUEST_RENAME));

        axios.post('/api/groups/rename', { groupid: groupid, newGroupName: newName })
            .then(res => {
                dispatch(receive(RECEIVE_RENAME, res.data.payload));
            })
            .catch(err => {
                dispatch(error(GROUP_RENAME_FAILURE, err.message));
            });
    };
};

export const REQUEST_LOAD_PERMISSIONS = 'REQUEST_LOAD_PERMISSIONS';
export const RECEIVE_LOAD_PERMISSIONS = 'RECEIVE_LOAD_PERMISSIONS';
export const LOAD_PERMISSIONS_FAILURE = 'LOAD_PERMISSIONS_FAILURE';
export const loadPermissions = (data) => {
    return dispatch => {
        dispatch(request(REQUEST_LOAD_PERMISSIONS));

        axios.post('/api/groups/loadPermissions', data)
            .then(res => {
                dispatch(receive(RECEIVE_LOAD_PERMISSIONS, res.data.payload));
            })
            .catch(err => {
                dispatch(error(LOAD_PERMISSIONS_FAILURE, err.message));
            });
    };
};

export const REQUEST_LOAD_USER_LIST = 'REQUEST_LOAD_USER_LIST';
export const RECEIVE_LOAD_USER_LIST = 'RECEIVE_LOAD_USER_LIST';
export const LOAD_USER_LIST_FAILURE = 'LOAD_USER_LIST_FAILURE';
export const loadUserList = () => {
    return dispatch => {
        dispatch(request(REQUEST_LOAD_USER_LIST));

        axios.get('/api/groups/loadUserList')
            .then(res => {
                dispatch(receive(RECEIVE_LOAD_USER_LIST, res.data));
            })
            .catch(err => {
                dispatch(error(LOAD_USER_LIST_FAILURE, err.message));
            });
    };
};

export const EDIT_GROUP = 'EDIT_GROUP';
export const loadCurrentGroupID = (currentGroupID) => {
    return {
        type: EDIT_GROUP,
        payload: {
            currentGroupID: currentGroupID,
        }
    };
};