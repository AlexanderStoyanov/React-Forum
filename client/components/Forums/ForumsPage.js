import React from 'react';
import Forum from './Forum';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { loadForums } from '../../actions/loadForums';
import { loadTopics } from '../../actions/loadTopics';


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
            forumNames = this.props.forum.forumNames[0];
        }
        return (
            <div className="row">
                <div className="col-md">
                    <Forum
                        loadTopics={this.props.loadTopics}
                        forumNames={forumNames}
                    />
                </div>
            </div>
        );
    }
}

ForumsPage.propTypes = {
    loadForums: PropTypes.func.isRequired,
    loadTopics: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        forum: state.forum
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumsPage);