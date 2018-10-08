import { CHANGE_DIRECTORY } from '../actions/navigationBarActions';

export default (state = {}, action = {}) => {
    switch (action.type) {
        case CHANGE_DIRECTORY:
            return {
                directory: action.directory.text,
            }
        default: return state;
    }
}