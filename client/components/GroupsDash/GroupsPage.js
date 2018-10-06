import React from 'react';
import { connect } from 'react-redux';

import Groups from './Groups';
import { loadGroups, deleteGroup, renameGroup, addGroup, loadCurrentGroupID, loadPermissions, loadUserList } from '../../actions/groupsAction';

class GroupsPage extends React.Component {
    //async await for two functions to be called simultaneously
    async componentDidMount() {
        await this.props.loadGroups();
        this.props.loadUserList();
    }

    render() {
        let groupsData = ['Nothing there yet..'];
        if (this.props.groups.groupsData) {
            groupsData = this.props.groups.groupsData;
        }

        var userid = [], firstname = [], currentGroup = [];
        if (this.props.groups.userList) {
            for (var i = 0; i < this.props.groups.userList.length; i++) {
                userid.push(this.props.groups.userList[i].userid);
                firstname.push(this.props.groups.userList[i].firstname);
                currentGroup.push(this.props.groups.userList[i].groupid);
            }
        }

        return (
            <div className="container">
                <Groups
                    groupsData={groupsData}
                    userid={userid}
                    firstname={firstname}
                    currentGroup={currentGroup}
                    addGroup={this.props.addGroup}
                    deleteGroup={this.props.deleteGroup}
                    renameGroup={this.props.renameGroup}
                    loadCurrentGroupID={this.props.loadCurrentGroupID}
                    groupid={this.props.userDetails.currentGroupID}
                    loadPermissions={this.props.loadPermissions}
                    loadUserList={this.props.loadUserList}
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
        addGroup: (newGroupName) => {
            dispatch(addGroup(newGroupName));
        },
        loadCurrentGroupID: (currentGroupID) => {
            dispatch(loadCurrentGroupID(currentGroupID));
        },
        deleteGroup: (groupid) => {
            dispatch(deleteGroup(groupid));
        },
        renameGroup: (groupid, newName) => {
            dispatch(renameGroup(groupid, newName));
        },
        loadPermissions: (data) => {
            dispatch(loadPermissions(data));
        },
        loadUserList: () => {
            dispatch(loadUserList());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);