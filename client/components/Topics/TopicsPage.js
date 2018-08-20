import React from 'react';
import Topic from './Topic';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTopics } from '../../actions/load';


class TopicsPage extends React.Component {
    render() {
        const { getTopics } = this.props;
        return (
            <div className="row">
                <div className="col-md">
                    <Topic
                        getTopics={getTopics}
                    />
                </div>
            </div>
        );
    }
}

TopicsPage.propTypes = {
    getTopics: PropTypes.func.isRequired,
}

export default connect(null, { getTopics })(TopicsPage);