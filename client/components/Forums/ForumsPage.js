import React from 'react';
import Forum from './Forum';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { loadForums } from '../../actions/loadForums';
import { loadTopics } from '../../actions/loadTopics';
import { renameForum } from '../../actions/renameForum';


class ForumsPage extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.loadForums();

    }

    render() {
        let forumNames = ['Nothing there yet..'];
        if (this.props.forum.forumNames) {
            forumNames = this.props.forum.forumNames;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <Forum
                            loadTopics={this.props.loadTopics}
                            forumNames={forumNames}
                            group={this.props.userDetails.group}
                            renameForum={this.props.renameForum}
                            currentForumid={this.props.userDetails.currentForumID}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ForumsPage.propTypes = {
    loadForums: PropTypes.func.isRequired,
    loadTopics: PropTypes.func.isRequired,
    renameForum: PropTypes.func.isRequired,
    currentForumid: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        forum: state.forum,
        userDetails: state.userDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadForums: () => {
            dispatch(loadForums());
        },
        loadTopics: (directory) => {
            dispatch(loadTopics(directory));
        },
        renameForum: (id, name) => {
            dispatch(renameForum(id, name));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumsPage);