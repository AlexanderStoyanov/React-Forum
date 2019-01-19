import React from 'react';
import Reply from './Reply';
import { connect } from 'react-redux';
import { postReply, deleteReply, loadCurrentReplyID, updateReply } from '../../actions/replyAction';
import { addFlashMessage } from '../../actions/flashMessages';
import { loadReplies } from '../../actions/replyAction';
import { loadGroups, updateUsers } from '../../actions/groupsAction';

class RepliesPage extends React.Component {
    async componentDidMount() {
        await this.props.loadGroups();
    }

    render() {
        const { postReply, deleteReply, loadCurrentReplyID, updateReply, loadReplies, userDetails, reply, groups, updateUsers, addFlashMessage } = this.props;
        return (
            <Reply
                replies = {reply.replies}
                groups = {groups}
                updateUsers = {updateUsers}
                loadReplies={loadReplies}
                postReply={postReply}
                deleteReply={deleteReply}
                loadCurrentReplyID={loadCurrentReplyID}
                updateReply={updateReply}
                token={userDetails.token}
                currentTopicID={userDetails.currentTopicID}
                currentReplyID={userDetails.currentReplyID}
                editreplies={userDetails.permissions.editreplies}
                deletereplies={userDetails.permissions.deletereplies}
                addFlashMessage={addFlashMessage}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        reply: state.reply,
        groups: state.groups,
        userDetails: state.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteReply: async (id) => {
            await dispatch(deleteReply(id));
        },
        postReply: async (userDetails) => {
            await dispatch(postReply(userDetails));
        },
        addFlashMessage: (type, text) => {
            dispatch(addFlashMessage(type, text));
        },
        loadCurrentReplyID: (replyid) => {
            dispatch(loadCurrentReplyID(replyid));
        },
        updateReply: async (replyData) => {
            await dispatch(updateReply(replyData));
        },
        loadReplies: (id) => {
            dispatch(loadReplies(id));
        },
        loadGroups: () => {
            dispatch(loadGroups());
        },
        updateUsers: async (data) => {
            await dispatch(updateUsers(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesPage);
