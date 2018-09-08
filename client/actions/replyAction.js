import axios from 'axios';

export function replyPost(replyData) {
    return dispatch => {
        return axios.post('/api/replies/post', replyData);
    }
}