import React from 'react';
import Reply from './Reply';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReplies } from '../../actions/load';


class RepliesPage extends React.Component {
    render() {
        const { getReplies } = this.props;
        return (
            <div className="replies">
                <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <Reply
                                getReplies={getReplies}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RepliesPage.propTypes = {
    getReplies: PropTypes.func.isRequired,
}

export default connect(null, { getReplies })(RepliesPage);