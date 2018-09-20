import React from 'react';
import ForumEntry from '../common/ForumEntry';
import { withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

class Forum extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            edit: false,
            renameText: '',
            currentForumid: 1,
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.renameForum(this.props.currentForumid, this.state.renameText);
        console.log(this.state.renameText);
    }

    onClick(event) {
        if (event.target.className === 'nav-link') {
            this.props.loadTopics(event.target.name);
        }
        else if (event.target.title === 'edit') {
            console.log('edit!');
            this.setState({ edit: true });
        }
    }

    render() {
        var rows = [];
        for (var i = 0; i < this.props.forumNames.length; i++) {
            rows.push(<ForumEntry
                key={i}
                forumName={this.props.forumNames[i].forumname}
                forumURL={this.props.forumNames[i].forumname}
                forumID={this.props.forumNames[i].forumid}
                group={this.props.group}
                onClick={this.onClick}
            />);
        }
        
        if (this.state.edit) {
            const { errors } = this.state;
            return (
                <form onSubmit={this.onSubmit} >
                    <TextFieldGroup
                        error={errors.rename}
                        label="Rename"
                        onChange={this.onChange}
                        value={this.state.renameText}
                        field="renameText"
                        type="text"
                    />
                    <button type="submit" className="btn btn-primary">Rename</button>
                </form>
            );
        } else {
            return (
                <div className="forumEntries">
                    {rows}
                </div>
            );
        }
    }
}

Forum.propTypes = {
    forumNames: PropTypes.array,
    loadTopics: PropTypes.func.isRequired,
}

export default withRouter(Forum)