import React from 'react';
import { connect } from 'react-redux';

import Groups from './Groups';
import { addFlashMessage } from '../../actions/flashMessages';
import { loadGroups, deleteGroup, renameGroup, addGroup, loadCurrentGroupID, loadPermissions, loadUserList, updateUsers } from '../../actions/groupsAction';

class GroupsPage extends React.Component {
    //async await for two functions to be called simultaneously
    async componentDidMount() {
        await this.props.loadGroups();
        await this.props.loadUserList();
    }

    render() {

        return (
            <div className="container">
                <Groups
                    groups={this.props.groups}
                    addGroup={this.props.addGroup}
                    deleteGroup={this.props.deleteGroup}
                    renameGroup={this.props.renameGroup}
                    loadCurrentGroupID={this.props.loadCurrentGroupID}
                    groupid={this.props.userDetails.currentGroupID}
                    loadPermissions={this.props.loadPermissions}
                    loadUserList={this.props.loadUserList}
                    updateUsers={this.props.updateUsers}
                    addFlashMessage={this.props.addFlashMessage}
                    loadGroups={this.props.loadGroups}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        groups: state.groups,
        userDetails: state.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadGroups: () => {
            dispatch(loadGroups());
        },
        addGroup: async (newGroupName) => {
            await dispatch(addGroup(newGroupName));
        },
        loadCurrentGroupID: (currentGroupID) => {
            dispatch(loadCurrentGroupID(currentGroupID));
        },
        deleteGroup: async (groupid) => {
            await dispatch(deleteGroup(groupid));
        },
        renameGroup: async (groupid, newName) => {
            await dispatch(renameGroup(groupid, newName));
        },
        loadPermissions: async (data) => {
            await dispatch(loadPermissions(data));
        },
        loadUserList: () => {
            dispatch(loadUserList());
        },
        updateUsers: async (data) => {
            await dispatch(updateUsers(data));
        },
        addFlashMessage: (type, text) => {
            dispatch(addFlashMessage(type, text));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);