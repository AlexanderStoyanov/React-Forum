import React from 'react';
import GroupEntry from '../common/GroupEntry';
import UserEntry from '../common/UserEntry';
import TextFieldGroup from '../common/TextFieldGroup';

const permissionTemplate = {
    edittopics: null,
    deletetopics: null,
    editreplies: null,
    deletereplies: null,
    blocked: null,
}

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
            permissions: {},
            newUserGroups: {},
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
        //if we are checking or unchecking checkboxes
        if (event.target.type === "checkbox") {
            //find if groupid is already in the state's permissions
            let id = event.target.getAttribute('data-id');
            if (this.state.permissions[id]) {
                //if it is, modify existing permission entry
                this.setState({ permissions: { ...this.state.permissions, [id]: { ...this.state.permissions[id], [event.target.name]: event.target.checked } } });
            } else {
                //if it is not, create new permission entry
                this.setState({ permissions: { ...this.state.permissions, [id]: { ...permissionTemplate, [event.target.name]: event.target.checked } } });
            }
        }
        //else if we are selecting new group from grouplist
        else if (event.target.tagName.toLowerCase() === "select") {
            //console.log(event.target);
            //console.log(event.target.value); //groupid
            var userID = event.target.getAttribute("data-userid");
            this.setState({ newUserGroups: { ...this.state.newUserGroups, [userID]: event.target.value } });
        }
        //if we are changing text-field state 
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    onSubmit(event) {
        event.preventDefault();
        //if we are adding new group
        if (this.state.add) {
            this.props.addGroup(this.state.newName);
        }
        //else if we are editing existing group
        else if (this.state.edit) {
            this.props.renameGroup(this.props.groupid, this.state.renameText);
        }
        //else if we are managing users (assigning groups to users)
        else if (this.state.manageUsers) {
            this.props.updateUsers(this.state.newUserGroups);
        }
        //if we are submitting group permissions (default onSubmit value, since it is rendered first on the groups page)
        else {
            this.props.loadPermissions(this.state.permissions);
        }
        this.setState({ edit: false, add: false, manageUsers: false });
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
            var rows = [], groupIDs = [], groupNames = [];
            for (var i = 0; i < this.props.groupsData.length; i++) {
                groupIDs.push(this.props.groupsData[i].groupid);
                groupNames.push(this.props.groupsData[i].groupname)
            }
            for (var i = 0; i < this.props.userid.length; i++) {
                rows.push(<UserEntry
                    key={i}
                    onChange={this.onChange}
                    userid={this.props.userid[i]}
                    firstname={this.props.firstname[i]}
                    username={this.props.username[i]}
                    currentGroup={this.props.currentGroup[i]}
                    groupIDs={groupIDs}
                    groupNames={groupNames}
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
                            <form onSubmit={this.onSubmit}>
                                <table class="table table-striped table-dark mt-5">
                                    <thead>
                                        <tr>
                                            <th scope="col">Username (First name)</th>
                                            <th scope="col">Current Group</th>
                                            <th scope="col">New Group</th>
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
        } else {
            var rows = this.props.groupsData.map(data =>
                <GroupEntry
                    key={data.groupid}
                    onClick={this.onClick}
                    onChange={this.onChange}
                    groupid={data.groupid}
                    groupName={data.groupname}
                    edittopics={data.edittopics}
                    deletetopics={data.deletetopics}
                    editreplies={data.editreplies}
                    deletereplies={data.deletereplies}
                    blocked={data.blocked}
                    disabled={(data.groupname === 'Administrator') ? true : false }
                />
            );
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