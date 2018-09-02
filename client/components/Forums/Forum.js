import React from 'react';
import ForumEntry from '../common/ForumEntry';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class Forum extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        var rows = [];
        for (var i = 0; i < this.props.forumNames.length; i++) {
            rows.push(<ForumEntry
                key={i}
                forumName={this.props.forumNames[i].forumname}
                forumURL={this.props.forumNames[i].forumname}
            />);
        }

        return (
            <div >
                {rows}
            </div>
        );
    }
}

Forum.propTypes = {
    forumNames: PropTypes.array,
}

export default withRouter(Forum)