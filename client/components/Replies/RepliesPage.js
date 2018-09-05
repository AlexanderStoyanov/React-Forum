import React from 'react';
import Reply from './Reply';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class RepliesPage extends React.Component {
    render() {
        let replies = ['Nothing there yet..'];
        if (this.props.reply.replies) {
            replies = this.props.reply.replies[0];
        }
        return (
            <div className="row">
                <div className="col-md">
                    <Reply
                        replies={replies}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reply: state.reply
    }
}

export default connect(mapStateToProps)(RepliesPage);