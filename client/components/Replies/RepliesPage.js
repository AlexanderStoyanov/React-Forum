import React from 'react';
import Reply from './Reply';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReplies } from '../../actions/load';


class RepliesPage extends React.Component {
    render() {
        const { getReplies } = this.props;
        return (
            <div className="row">
                <div className="col-md">
                    <Reply
                        getReplies={getReplies}
                    />
                </div>
            </div>
        );
    }
}

RepliesPage.propTypes = {
    getReplies: PropTypes.func.isRequired,
}

export default connect(null, { getReplies })(RepliesPage);