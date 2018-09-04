import axios from 'axios';

export const TOPICS_REQUEST_FAILURE = 'TOPICS_REQUEST_FAILURE';
function postFailure(error) {
    return {
        type: TOPICS_REQUEST_FAILURE,
        payload: {
            error
        }
    }
}

export const REQUEST_TOPICS = 'REQUEST_TOPICS';
function requestTopics(directory) {
    return {
        type: REQUEST_TOPICS,
        directory: directory
    }
}

export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
function receiveTopics(json) {
    return {
        type: RECEIVE_TOPICS,
        topics: json,
        receivedAt: Date.now()
    }
}

export const loadTopics = (directory) => {
    return dispatch => {
        dispatch(requestTopics(directory));

        axios.get('/api/topics/load', {
            params: {
                directory: directory
            }
        })
            .then(res => {
                //console.log(res);
                dispatch(receiveTopics(res.data.payload));
            })
            .catch(err => {
                //console.log(err);
                dispatch(postFailure(err.message));
            });
    };
};