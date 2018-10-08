import React from 'react';
import Reply from './Reply';
import { connect } from 'react-redux';
import { postReply, deleteReply, loadCurrentReplyID, updateReply } from '../../actions/replyAction';
import { addFlashMessage } from '../../actions/flashMessages';

class RepliesPage extends React.Component {
    render() {
        let replies = [], names = [], dates = [], ids = [], groups = [];

        if (this.props.reply.replies) {
            for (let i = 0; i < this.props.reply.replies.length; i++) {
                replies.push(this.props.reply.replies[i].text);
                names.push(this.props.reply.replies[i].firstname);
                dates.push(this.props.reply.replies[i].date);
                ids.push(this.props.reply.replies[i].replyid);
                groups.push(this.props.reply.replies[i].groupname);
            }
        }

        return (
            <Reply
                replies={replies}
                names={names}
                dates={dates}
                ids={ids}
                groups={groups}
                postReply={this.props.postReply}
                deleteReply={this.props.deleteReply}
                currentTopicID={this.props.userDetails.currentTopicID}
                token={this.props.userDetails.token}
                loadCurrentReplyID={this.props.loadCurrentReplyID}
                currentReplyID={this.props.userDetails.currentReplyID}
                updateReply={this.props.updateReply}
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
