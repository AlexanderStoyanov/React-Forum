export const CHANGE_DIRECTORY = 'CHANGE_DIRECTORY';
export const NAVIGATE_SIGNUP = 'NAVIGATE_SIGNUP';
export const NAVIGATE_SIGNIN = 'NAVIGATE_SIGNIN';

export function changeDir(directory) {
    return {
        type: CHANGE_DIRECTORY,
        directory
    }
}

export const SIGN_OUT = 'SIGN_OUT';
export function signOut() {
    return {
        type: SIGN_OUT,
    }
}