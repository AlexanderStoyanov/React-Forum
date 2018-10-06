import React from 'react';
import GroupEntry from '../common/GroupEntry';
import UserEntry from '../common/UserEntry';
import TextFieldGroup from '../common/TextFieldGroup';
import { throws } from 'assert';

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
            edittopics: null,
            permissions: {
                editreplies: null,
                deletereplies: null,
                edittopics: null,
                deletetopics: null,
                blocked: null
            }
        }

        this.add = this.add.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
        this.manageUsers = this.manageUsers.bind(this);
        this.back = this.back.bind(this);
        this.loadNewPermissions = this.loadNewPermissions.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    add() {
        this.setState({ add: true });
    }

    deleteGroup(event) {
        event.preventDefault();
        this.props.deleteGroup(this.props.groupid);
    }

    manageUsers() {
        this.setState({ manageUsers: true });
    }

    back() {
        this.setState({ edit: false, add: false, manageUsers: false });
    }

    loadNewPermissions() {
        this.props.loadPermissions(this.state.permissions);
    }

    onChange(event) {
        console.log(event.target);
        console.log(this.state.edittopics);
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.add) {
            this.props.addGroup(this.state.newName);
        }
        else if (this.state.edit) {
            this.props.renameGroup(this.props.groupid, this.state.renameText);
        }
        else {
            console.log(this.state.edittopics);
            this.props.loadPermissions(this.state.permissions);
        }
        this.setState({ edit: false, add: false });
    }

    onClick(event) {
        event.preventDefault();
        if (event.target.title === 'edit') {
            this.props.loadCurrentGroupID(event.target.getAttribute('data-id'));
            this.setState({ edit: true });
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
                                <button onClick={this.deleteGroup} className="btn btn-danger float-right m-1">Delete Group</button>
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
                rows.push(
                    <GroupEntry
                        key={i}
                        onClick={this.onClick}
                        onChange={this.onChange}
                        groupName={this.props.groupsData[i].groupname}
                        groupid={this.props.groupsData[i].groupid}
                        field="edittopics"
                        checked={this.state.edittopics}
                    />
                );
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
                            <form onSubmit={this.onSubmit}>
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
                                <button type="submit" class="btn btn-primary">Submit Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Groups;