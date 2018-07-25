import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
    let errors = {};

    if (data.fname === '') {
        errors.username = 'First name is required';
    }
    if (data.username === '') {
        errors.username = 'Username is required';
    }
    if (data.password === '') {
        errors.password = 'Password is required';
    }
    if (data.password2 === '') {
        errors.username = 'Password confirmation required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}