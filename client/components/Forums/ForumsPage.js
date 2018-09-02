import React from 'react';
import Forum from './Forum';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { loadForums } from '../../actions/loadForums';


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
                        forumNames={forumNames}
                    />
                </div>
            </div>
        );
    }
}

ForumsPage.propTypes = {
    loadForums: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumsPage);