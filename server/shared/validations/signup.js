import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if (data.fname === '') {
        errors.fname = 'First name is required';
    }
    if (data.username === '') {
        errors.username = 'Username is required';
    }
    if (data.password === '') {
        errors.password = 'Password is required';
    }
    if (data.password2 === '') {
        errors.password2 = 'Password confirmation is required';
    }
    if (data.password !== data.password2) {
        errors.passwordsMatch = 'Passwords do not match!'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}