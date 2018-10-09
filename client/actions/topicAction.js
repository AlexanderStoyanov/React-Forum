import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

//Renames existing topic
export const REQUEST_RENAME = 'REQUEST_TOPICS';
export const RECEIVE_RENAME = 'RECEIVE_TOPICS';
export const TOPIC_RENAME_FAILURE = 'TOPICS_REQUEST_FAILURE';
export const renameTopic = (topicid, newName) => {
    return async dispatch => {
        dispatch(request(REQUEST_RENAME));
        try {
            let res = await axios.post('/api/topics/rename', { topicid: topicid, newTopicName: newName });
            dispatch(receive(RECEIVE_RENAME, res.data.payload));
        } catch (err) {
            dispatch(error(TOPIC_RENAME_FAILURE, err.message));
        }
    };
};

//Adds new topic
export const ADD_TOPIC_REQUEST = 'ADD_TOPIC_REQUEST';
export const ADD_TOPIC_SUCCESS = 'ADD_TOPIC_SUCCESS';
export const ADD_TOPIC_FAILURE = 'ADD_TOPIC_FAILURE';
export const addTopic = (forumid, topicName) => {
    return async dispatch => {
        dispatch(request(ADD_TOPIC_REQUEST));
        try {
            let res = await axios.post('/api/topics/add', { forumid: forumid, topicName: topicName });
            dispatch(receive(ADD_TOPIC_SUCCESS, res.status));
        } catch (err) {
            dispatch(error(ADD_TOPIC_FAILURE, err.message));
        }
    };
};

//Deletes existing topic
export const REQUEST_DELETE = 'REQUEST_DELETE';
export const RECEIVE_DELETE = 'RECEIVE_DELETE';
export const TOPIC_DELETE_FAILURE = 'TOPIC_DELETE_FAILURE';
export const deleteTopic = (topicid) => {
    return async dispatch => {
        dispatch(request(REQUEST_DELETE));
        try {
            let res = await axios.post('/api/topics/delete', { topicid: topicid });
            dispatch(receive(RECEIVE_DELETE, res.status));
        } catch (err) {
            dispatch(error(TOPIC_DELETE_FAILURE, err.message));
        }
    };
};

//Restores existing topic from deletion
export const REQUEST_RESTORE = 'REQUEST_RESTORE';
export const RECEIVE_RESTORE = 'RECEIVE_RESTORE';
export const TOPIC_RESTORE_FAILURE = 'TOPIC_RESTORE_FAILURE';
export const restoreTopic = (topicid) => {
    return async dispatch => {
        dispatch(request(REQUEST_RESTORE));
        try {
            let res = await axios.post('/api/topics/restore', { topicid: topicid });
            dispatch(receive(RECEIVE_RESTORE, res.status));
        } catch (err) {
            dispatch(error(TOPIC_RESTORE_FAILURE, err.message));
        }
    };
};

//Loads topics @init
export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const TOPICS_REQUEST_FAILURE = 'TOPICS_REQUEST_FAILURE';
export const loadTopics = (forumid) => {
    return async dispatch => {
        dispatch(request(REQUEST_TOPICS));
        try {
            let res = await axios.get('/api/topics/load', { params: { forumid: forumid }});
            dispatch(receive(RECEIVE_TOPICS, res.data.payload));
        } catch (err) {
            dispatch(error(TOPICS_REQUEST_FAILURE, err.message));
        }
    };
};

//Stores current topic id in the userDetails instance of store
export const EDIT_TOPIC = 'EDIT_TOPIC';
export const loadCurrentTopicID = (currentTopicID) => {
    return {
        type: EDIT_TOPIC,
        payload: {
            currentTopicID: currentTopicID,
        }
    };
};