import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

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