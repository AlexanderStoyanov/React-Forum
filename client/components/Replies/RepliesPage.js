import React from 'react';
import Reply from './Reply';
import { connect } from 'react-redux';
import { postReply, deleteReply, loadCurrentReplyID, updateReply } from '../../actions/replyAction';
import { addFlashMessage } from '../../actions/flashMessages';
import { loadReplies } from '../../actions/replyAction';

class RepliesPage extends React.Component {
    render() {
        const { postReply, deleteReply, loadCurrentReplyID, updateReply, loadReplies, userDetails, reply } = this.props;
        return (
            <Reply
                replies = {reply.replies}
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
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        reply: state.reply,
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
        addFlashMessage: () => {
            dispatch(addFlashMessage());
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesPage);
