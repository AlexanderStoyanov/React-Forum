import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { withRouter } from "react-router-dom";

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false,
            loggedin: false,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    isValid() {
        if (this.state.username === '' || this.state.password === '') {
            return false;
        }
        return true;
    }

    onSubmit(event) {
        event.preventDefault();

        const { history } = this.props;

        if (this.isValid()) {
            this.props.userSignInRequest(this.state);

            //if (!this.props.userDetails.error) {
            //    this.props.addFlashMessage({
            //        type: 'success',
            //        text: 'Logged in successfully!'
            //    });
            //    this.props.history.push("/forum");
            //} else {
            //    this.props.addFlashMessage({
            //        type: 'error',
            //        text: 'Username or password is incorrect!'
            //    });
            //}
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

export default withRouter(SignInForm);