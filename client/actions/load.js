import axios from 'axios';

export function getForums() {
    return dispatch => {
        return axios.get('/api/forums/load');
    }
}

export function getTopics(directory) {

    return dispatch => {
        return axios.get('/api/topics/load', {
            params: {
                directory: directory
            }
        });
    }
}

export function getReplies() {
    return dispatch => {
        return axios.get('/api/replies/load');
    }
}