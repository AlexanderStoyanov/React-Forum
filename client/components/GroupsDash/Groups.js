import React from 'react';
import GroupEntry from '../common/GroupEntry';
import UserEntry from '../common/UserEntry';
import TextFieldGroup from '../common/TextFieldGroup';
import GroupSelectionEntry from '../common/GroupSelectionEntry';

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
            newName: null,
            renameText: null,
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

    async deleteGroup(event) {
        const { deleteGroup, loadGroups, groupid, groups, addFlashMessage } = this.props;
        event.preventDefault();
        await deleteGroup(groupid);
        //refresh group list
        loadGroups();
        //if no error, add success message
        if (!groups.error) {
            addFlashMessage({
                type: 'success',
                text: 'Group has been deleted!',
            });
        //else if error, add error message
        } else {
            addFlashMessage({
                type: 'error',
                text: groups.error,
            });
        }
        this.setState({ edit: false, add: false, manageUsers: false });
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
                this.setState({ permissions: { ...this.state.permissions, [id]: { ...this.state.permissions[id], [event.target.name]: event.target.checked } } },
                    () => { console.log(this.state.permissions) });
            } else {
                //if it is not, create new permission entry
                this.setState({ permissions: { ...this.state.permissions, [id]: { ...permissionTemplate, [event.target.name]: event.target.checked } } },
                    () => { console.log(this.state.permissions) });
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

    async onSubmit(event) {
        event.preventDefault();
        const { addGroup, loadGroups, renameGroup, groupid, updateUsers, loadUserList, loadPermissions, addFlashMessage, groups } = this.props;
        var text = null;
        //if we are adding new group
        if (this.state.add) {
            await addGroup(this.state.newName);
            //refresh group list
            loadGroups();
            text = 'Group has been added!';
        }
        //else if we are editing existing group
        else if (this.state.edit) {
            await renameGroup(groupid, this.state.renameText);
                //refresh group list
                loadGroups();
                text = 'Renamed successfully!';
        }
        //else if we are managing users (assigning groups to users)
        else if (this.state.manageUsers) {
            await updateUsers(this.state.newUserGroups);
            //refresh user list to display currently assigned groups
            loadUserList();
            text = 'Groups assigned successfully!';
        }
        //if we are submitting group permissions (default onSubmit value, since it is rendered first on the groups page)
        else {
            await loadPermissions(this.state.permissions);
            text = 'Permissions changed successfully!';
        }

        //if no error, add success message
        if (!groups.error) {
            addFlashMessage({
                type: 'success',
                text: text,
            });
            //else if error, add error message
        } else {
            addFlashMessage({
                type: 'error',
                text: groups.error,
            });
        }
        //reseting everything in the state to its original value
        this.setState({ edit: false, add: false, manageUsers: false, newName: null, renameText: null, newUserGroups: {}, permissions: {} });
    }

    onClick(event) {
        event.preventDefault();
        if (event.target.title === 'edit') {
            this.props.loadCurrentGroupID(event.target.getAttribute('data-id'));
            this.setState({ edit: true });
        }
    }

    render() {
        const { groups } = this.props;
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
            //null check
            if (groups.groupsData && groups.userList) {
                var groupSelectionArray = groups.groupsData.map(group =>
                    <GroupSelectionEntry
                        groupID={group.groupid}
                        groupName={group.groupname}
                    />
                );
    
                var userEntryArray = groups.userList.map(user =>
                    <UserEntry
                        key={user.userid}
                        onChange={this.onChange}
                        userid={user.userid}
                        firstname={user.firstname}
                        username={user.username}
                        currentGroup={user.groupname}
                        groupSelectionArray={groupSelectionArray}
                    />
                );
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
                                <table className="table table-striped table-dark mt-5">
                                    <thead>
                                        <tr>
                                            <th scope="col">Username (First name)</th>
                                            <th scope="col">Current Group</th>
                                            <th scope="col">New Group</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userEntryArray}
                                    </tbody>
                                </table>
                                <button type="submit" className="btn btn-primary">Submit Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            //null check
            if (groups.groupsData) {
                var groupEntryArray = groups.groupsData.map(data =>
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
                        disabled={(data.groupname === 'Administrator') ? true : false}
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
                                <table className="table table-striped table-dark mt-5">
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
                                        {groupEntryArray}
                                    </tbody>
                                </table>
                                <button type="submit" className="btn btn-primary">Submit Changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Groups;