import React from 'react';
import Reply from './Reply';
import { connect } from 'react-redux';
import { postReply, deleteReply, loadCurrentReplyID, updateReply } from '../../actions/replyAction';
import { addFlashMessage } from '../../actions/flashMessages';

class RepliesPage extends React.Component {
    render() {
        return (
            <Reply
                replies = {this.props.reply.replies}
                postReply={this.props.postReply}
                deleteReply={this.props.deleteReply}
                currentTopicID={this.props.userDetails.currentTopicID}
                token={this.props.userDetails.token}
                loadCurrentReplyID={this.props.loadCurrentReplyID}
                currentReplyID={this.props.userDetails.currentReplyID}
                updateReply={this.props.updateReply}
                editreplies={this.props.userDetails.permissions.editreplies}
                deletereplies={this.props.userDetails.permissions.deletereplies}
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
        deleteReply: (id) => {
            dispatch(deleteReply(id));
        },
        postReply: (userDetails) => {
            dispatch(postReply(userDetails));
        },
        addFlashMessage: () => {
            dispatch(addFlashMessage());
        },
        loadCurrentReplyID: (replyid) => {
            dispatch(loadCurrentReplyID(replyid));
        },
        updateReply: (replyData) => {
            dispatch(updateReply(replyData));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepliesPage);
