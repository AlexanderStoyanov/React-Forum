import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validateInput from '../../server/shared/validations/signup';
import TextFieldGroup from './common/TextFieldGroup';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

        if (this.isValid()) {
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignUpRequest(this.state).then(
                () => {
                    
                    console.log("bla");
                },
                (err) => this.setState({ errors: err.response.data, isLoading: false })
            );
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

                <button disabled={this.state.isLoading} type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired
}

export default SignUpForm;