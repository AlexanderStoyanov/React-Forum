import axios from 'axios';

export const ADD_FORUM_FAILURE = 'ADD_FORUM_FAILURE';
function postFailure(error) {
    return {
        type: ADD_FORUM_FAILURE,
        payload: {
            error
        }
    }
}

export const ADD_FORUM_REQUEST = 'ADD_FORUM_REQUEST';
function addForumRequest() {
    return {
        type: ADD_FORUM_REQUEST,
    }
}

export const ADD_FORUM_SUCCESS = 'ADD_FORUM_SUCCESS';
function addForumSuccess() {
    return {
        type: ADD_FORUM_SUCCESS,
    }
}

export const addForum = () => {
    return dispatch => {
        dispatch(addForumRequest());

        axios.post('/api/forums/add')
            .then(res => {
                console.log(res);
                dispatch(addForumSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(postFailure(err.message));
            });
    };
};