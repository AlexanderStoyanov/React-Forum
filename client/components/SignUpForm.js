import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../../server/shared/validations/signup';
import TextFieldGroup from './common/TextFieldGroup';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false,
            invalid: false,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }


    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }

    onSubmit(event) {
        event.preventDefault();

        const { history } = this.props;
        const field = event.target.name;

        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignUpRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'Account created successfully'
                    });
                    this.props.history.push("/");
                },
                (err) => {
                    this.setState({ errors: err.response.data, isLoading: false });
                    
                }
            );
        }
    }

    checkUserExists(event) {
        const field = event.target.name;
        const val = event.target.value;
        if (val !== '') {
            this.props.doesUserExist(val).then(
                (res) => {
                    let errors = this.state.errors;
                    let invalid;
                    if (res.data.user) {
                        errors[field] = 'Username already taken';
                        invalid = true;
                    } else {
                        errors[field] = '';
                        invalid = false;
                    }
                    this.setState({ errors, invalid });
                });
        }
    }

    render() {

        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit} >

                <TextFieldGroup
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.username}
                    field="username"
                />

                <TextFieldGroup
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                    type="password"
                />

                <button disabled={this.state.isLoading || this.state.invalid} type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    doesUserExist: PropTypes.func.isRequired
}

export default withRouter(SignUpForm);