import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

export const REQUEST_RENAME = 'REQUEST_TOPICS';
export const RECEIVE_RENAME = 'RECEIVE_TOPICS';
export const TOPIC_RENAME_FAILURE = 'TOPICS_REQUEST_FAILURE';
export const renameTopic = (topicid, newName) => {
    return dispatch => {
        dispatch(request(REQUEST_RENAME));

        axios.post('/api/topics/rename', { topicid: topicid, newTopicName: newName })
            .then(res => {
                dispatch(receive(RECEIVE_RENAME, res.data.payload));
            })
            .catch(err => {
                dispatch(error(TOPIC_RENAME_FAILURE, err.message));
            });
    };
};

export const ADD_TOPIC_REQUEST = 'ADD_TOPIC_REQUEST';
export const ADD_TOPIC_SUCCESS = 'ADD_TOPIC_SUCCESS';
export const ADD_TOPIC_FAILURE = 'ADD_TOPIC_FAILURE';
export const addTopic = (forumid, topicName) => {
    return dispatch => {
        dispatch(request(ADD_TOPIC_REQUEST));

        axios.post('/api/topics/add', { forumid: forumid, topicName: topicName })
            .then(res => {
                dispatch(receive(ADD_TOPIC_SUCCESS, res.status));
            })
            .catch(err => {
                dispatch(error(ADD_TOPIC_FAILURE, err.message));
            });
    };
};

export const REQUEST_DELETE = 'REQUEST_DELETE';
export const RECEIVE_DELETE = 'RECEIVE_DELETE';
export const TOPIC_DELETE_FAILURE = 'TOPIC_DELETE_FAILURE';
export const deleteTopic = (topicid) => {
    return dispatch => {
        dispatch(request(REQUEST_DELETE));

        axios.post('/api/topics/delete', { topicid: topicid })
            .then(res => {
                dispatch(receive(RECEIVE_DELETE, res.status));
            })
            .catch(err => {
                dispatch(error(TOPIC_DELETE_FAILURE, err.message));
            });
    };
};

export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const TOPICS_REQUEST_FAILURE = 'TOPICS_REQUEST_FAILURE';
export const loadTopics = (forumid) => {
    return dispatch => {
        dispatch(request(REQUEST_TOPICS));

        axios.get('/api/topics/load', {
            params: {
                forumid: forumid
            }
        }).then(res => {
            dispatch(receive(RECEIVE_TOPICS, res.data.payload));
        }).catch(err => {
            dispatch(error(TOPICS_REQUEST_FAILURE, err.message));
        });
    };
};

export const EDIT_TOPIC = 'EDIT_TOPIC';
export const loadCurrentTopicID = (currentTopicID) => {
    return {
        type: EDIT_TOPIC,
        payload: {
            currentTopicID: currentTopicID,
        }
    };
};