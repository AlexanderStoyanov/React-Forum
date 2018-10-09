import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

//Loads groups @ init
export const REQUEST_GROUPS = 'REQUEST_GROUPS';
export const RECEIVE_GROUPS = 'RECEIVE_GROUPS';
export const GROUPS_REQUEST_FAILURE = 'GROUPS_REQUEST_FAILURE';
export const loadGroups = () => {
    return async dispatch => {
        dispatch(request(REQUEST_GROUPS));
        try {
            let res = await axios.get('/api/groups/load');
            dispatch(receive(RECEIVE_GROUPS, res.data));
        } catch (err) {
            dispatch(error(GROUPS_REQUEST_FAILURE, err.message));
        }
    };
};

//Adds new group
export const REQUEST_ADD_GROUP = 'REQUEST_ADD_GROUP';
export const RECEIVE_ADD_GROUP = 'RECEIVE_ADD_GROUP';
export const GROUP_ADD_FAILURE = 'GROUP_ADD_FAILURE';
export const addGroup = (newGroupName) => {
    return async dispatch => {
        dispatch(request(REQUEST_ADD_GROUP));
        try {
            let res = await axios.post('/api/groups/add', {newGroupName: newGroupName});
            dispatch(receive(RECEIVE_ADD_GROUP, res.data));
        } catch (err) {
            dispatch(error(GROUP_ADD_FAILURE, err.message));
        }
    };
};

//Deletes existing group
export const REQUEST_DELETE = 'REQUEST_DELETE';
export const RECEIVE_DELETE = 'RECEIVE_DELETE';
export const GROUP_DELETE_FAILURE = 'GROUP_DELETE_FAILURE';
export const deleteGroup = (groupid) => {
    return async dispatch => {
        dispatch(request(REQUEST_DELETE));
        try {
            let res = await axios.post('/api/groups/delete', { groupid: groupid });
            dispatch(receive(RECEIVE_DELETE, res.data.payload));
        } catch (err) {
            dispatch(error(GROUP_DELETE_FAILURE, err.message));
        }
    };
};

//Renames existing group
export const REQUEST_RENAME = 'REQUEST_GROUPS';
export const RECEIVE_RENAME = 'RECEIVE_GROUPS';
export const GROUP_RENAME_FAILURE = 'GROUPS_REQUEST_FAILURE';
export const renameGroup = (groupid, newName) => {
    return async dispatch => {
        dispatch(request(REQUEST_RENAME));
        try {
            let res = await axios.post('/api/groups/rename', { groupid: groupid, newGroupName: newName });
            dispatch(receive(RECEIVE_RENAME, res.data.payload));
        } catch (err) {
            dispatch(error(GROUP_RENAME_FAILURE, err.message));
        }
    };
};

//Loads new permissions defined by the user to the database
export const REQUEST_LOAD_PERMISSIONS = 'REQUEST_LOAD_PERMISSIONS';
export const RECEIVE_LOAD_PERMISSIONS = 'RECEIVE_LOAD_PERMISSIONS';
export const LOAD_PERMISSIONS_FAILURE = 'LOAD_PERMISSIONS_FAILURE';
export const loadPermissions = (data) => {
    return async dispatch => {
        dispatch(request(REQUEST_LOAD_PERMISSIONS));
        try {
            let res = await axios.post('/api/groups/loadPermissions', data);
            dispatch(receive(RECEIVE_LOAD_PERMISSIONS, res.data.payload));
        } catch (err) {
            dispatch(error(LOAD_PERMISSIONS_FAILURE, err.message));
        }
    };
};

//Loads all existing users
export const REQUEST_LOAD_USER_LIST = 'REQUEST_LOAD_USER_LIST';
export const RECEIVE_LOAD_USER_LIST = 'RECEIVE_LOAD_USER_LIST';
export const LOAD_USER_LIST_FAILURE = 'LOAD_USER_LIST_FAILURE';
export const loadUserList = () => {
    return async dispatch => {
        dispatch(request(REQUEST_LOAD_USER_LIST));
        try {
            let res = await axios.get('/api/groups/loadUserList');
            dispatch(receive(RECEIVE_LOAD_USER_LIST, res.data));
        } catch (err) {
            dispatch(error(LOAD_USER_LIST_FAILURE, err.message));
        }
    };
};

//Sends updates userlist with new info to the database
export const REQUEST_UPDATE_USERS_LIST = 'REQUEST_UPDATE_USERS_LIST';
export const RECEIVE_UPDATE_USERS_LIST = 'RECEIVE_UPDATE_USERS_LIST';
export const UPDATE_USERS_LIST_FAILURE = 'UPDATE_USERS_LIST_FAILURE';
export const updateUsers = (data) => {
    return async dispatch => {
        dispatch(request(REQUEST_UPDATE_USERS_LIST));
        try {
            let res = await axios.post('/api/groups/updateUsers', data);
            dispatch(receive(RECEIVE_UPDATE_USERS_LIST, res.data));
        } catch (err) {
            dispatch(error(UPDATE_USERS_LIST_FAILURE, err.message));
        }
    };
};

//Stores current group id in the userDetails store instance
export const EDIT_GROUP = 'EDIT_GROUP';
export const loadCurrentGroupID = (currentGroupID) => {
    return {
        type: EDIT_GROUP,
        payload: {
            currentGroupID: currentGroupID,
        }
    };
};