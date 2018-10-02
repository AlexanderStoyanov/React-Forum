import React from 'react';
import GroupEntry from '../common/GroupEntry';
import UserEntry from '../common/UserEntry';
import TextFieldGroup from '../common/TextFieldGroup';

class Groups extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            add: false,
            edit: false,
            manageUsers: false,
            newName: '',
            renameText: '',
        }

        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.manageUsers = this.manageUsers.bind(this);
        this.back = this.back.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    add() {
        this.setState({ add: true });
    }

    edit() {
        this.setState({ edit: true });
    }

    manageUsers() {
        this.setState({ manageUsers: true });
    }

    back() {
        this.setState({ edit: false, add: false, manageUsers: false });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.add) {
            this.props.addGroup(this.state.newName);
        }
    }

    render() {
        if (this.state.edit) {
            const { errors } = this.state;
            return (
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="editBlock mt-5">
                            <form onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                    error={errors.rename}
                                    label="Rename"
                                    onChange={this.onChange}
                                    value={this.state.renameText}
                                    field="renameText"
                                    type="text"
                                />
                                <button type="submit" className="btn btn-primary m-1">Rename</button>
                                <button onClick={this.back} className="btn btn-dark m-1">Back</button>
                                <button onClick={this.delete} className="btn btn-danger float-right m-1">Delete Group</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.add) {
            const { errors } = this.state;
            return (
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="editBlock mt-5">
                            <form onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                    error={errors.add}
                                    label="New Group Name"
                                    onChange={this.onChange}
                                    value={this.state.newName}
                                    field="newName"
                                    type="text"
                                />
                                <button type="submit" className="btn btn-primary m-1">Add</button>
                                <button onClick={this.back} className="btn btn-dark m-1">Back</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.manageUsers) {
            var rows = [];
            for (var i = 0; i < this.props.groupsData.length; i++) {
                rows.push(<UserEntry
                    key={i}
                    userid={this.props.userid[i]}
                    firstname={this.props.firstname[i]}
                    currentGroup={this.props.currentGroup[i]}
                />);
            }
            return (
                <div className="manageUsers">
                    <div className="row">
                        <div className="col-md">
                            <button onClick={this.back} className="btn btn-dark m-1">Back</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <table class="table table-striped table-dark mt-5">
                                <thead>
                                    <tr>
                                        <th scope="col">Username</th>
                                        <th scope="col">Current Group</th>
                                        <th scope="col">New Group</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else {
            var rows = [];
            for (var i = 0; i < this.props.groupsData.length; i++) {
                rows.push(<GroupEntry
                    key={i}
                    groupName={this.props.groupsData[i].groupname}
                    onClick={this.edit}
                />);
            }
            return (
                <div className="groupsWrap">
                    <div className="row">
                        <div className="col-md">
                            <button onClick={this.manageUsers} className="btn btn-primary m-1">Manage Users</button>
                            <button onClick={this.add} className="btn btn-success float-right m-1">Add Group</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <table class="table table-striped table-dark mt-5">
                                <thead>
                                    <tr>
                                        <th scope="col">Groupname</th>
                                        <th scope="col">Edit Topics</th>
                                        <th scope="col">Delete Topics</th>
                                        <th scope="col">Edit Replies</th>
                                        <th scope="col">Delete Replies</th>
                                        <th scope="col">Blocked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Groups;