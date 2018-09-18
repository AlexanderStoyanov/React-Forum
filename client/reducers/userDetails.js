import { SIGN_IN_FAILURE, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from '../actions/signInAction';

const initialState = {
    token: '',
    name: '',
    group: '',
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
            return {
                loading: true,
            };
        case SIGN_IN_SUCCESS:
            return {
                loading: false,
                error: null,
                token: action.payload.token,
                name: action.payload.name,
                group: action.payload.groupname
            };
        case SIGN_IN_FAILURE:
            return {
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}