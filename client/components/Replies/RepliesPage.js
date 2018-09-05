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
            <div className="replies">
                <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <Reply
                                replies={replies}
                            />
                        </div>
                    </div>
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