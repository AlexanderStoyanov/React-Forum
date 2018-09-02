import { NAVIGATE_HOME, NAVIGATE_SIGNU, NAVIGATE_SIGNINP } from '../actions/types';

export default (state = [], action = {}) => {
    switch (action.type) {
        case NAVIGATE_HOME:
            return [
                {
                    text: action.directory.text
                }
            ];
        default: return state;
    }
}