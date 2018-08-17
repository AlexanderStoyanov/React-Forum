import axios from 'axios';

export function getForums() {
    return dispatch => {
        return axios.get('/api/forums/load');
    }
}