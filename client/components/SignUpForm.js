import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


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

    onSubmit(event) {
        event.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        this.props.userSignUpRequest(this.state).then(
            () => { },
            (err) => this.setState({ errors: err.response.data, isLoading: false })
        );
    }

    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit} >

                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        name="username"
                        type="text"
                        className={classnames("form-control", { 'is-invalid': errors.username })}
                    ></input>
                    {errors.username && <span className="help-block">{errors.username}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        name="password"
                        type="password"
                        className={classnames("form-control", { 'is-invalid': errors.password })}
                    ></input>
                    {errors.username && <span className="help-block">{errors.password}</span>}
                </div>

                <button disabled={this.state.isLoading} type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    userSignUpRequest: PropTypes.func.isRequired
}

export default SignUpForm;