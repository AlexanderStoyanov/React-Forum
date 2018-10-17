import React from 'react';
import TopicEntry from '../common/TopicEntry';
import TextFieldGroup from '../common/TextFieldGroup';

class Topic extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            edit: false,
            add: false,
            newName: '',
            renameText: '',
        }

        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.back = this.back.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    add() {
        this.setState({ add: true });
    }

    async delete(event) {
        event.preventDefault();
        const { deleteTopic, loadTopics, currentTopicID, currentForumID } = this.props;
        await deleteTopic(currentTopicID);
        this.setState({ edit: false, add: false });
        //refresh page
        loadTopics(currentForumID);
    }

    back() {
        this.setState({ edit: false, add: false });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async onSubmit(event) {
        event.preventDefault();
        const { currentTopicID, currentForumID, renameTopic, loadTopics, addTopic } = this.props;
        if (this.state.edit) {
            await renameTopic(currentTopicID, this.state.renameText);
            //refresh page
            loadTopics(currentForumID);
        }
        else if (this.state.add) {
            await addTopic(currentForumID, this.state.newName);
            //refresh page
            loadTopics(currentForumID);
        }
        this.setState({ edit: false, add: false });
    }

    async onClick(event) {
        const { loadCurrentTopicID, loadReplies, restoreTopic, loadTopics, currentForumID } = this.props;
        if (event.target.tagName.toLowerCase() === 'a') {
            loadCurrentTopicID(event.target.name);
            loadReplies(event.target.name);
        }
        else if (event.target.title === 'edit') {
            loadCurrentTopicID(event.target.name);
            this.setState({ edit: true });
        }
        else if (event.target.title === 'restore') {
            event.preventDefault();
            await restoreTopic(event.target.name);
            //refresh page
            loadTopics(currentForumID);
        }
    }

    render() {
        const { deletetopics, edittopics, topicNames, forumURL, group, match } = this.props;
        if (this.state.edit) {
            const { errors } = this.state;
            let renameComponents = null;
            let deleteButton = null;
            if (deletetopics === '1') {
                deleteButton = <button onClick={this.delete} className="btn btn-danger float-right m-1">Delete Topic</button>;
            }
            if (edittopics === '1') {
                renameComponents = <div className="d-inline">
                    <TextFieldGroup
                        error={errors.rename}
                        label="Rename"
                        onChange={this.onChange}
                        value={this.state.renameText}
                        field="renameText"
                        type="text"
                    />
                    <button type="submit" className="btn btn-primary m-1">Rename</button>
                </div>
            }
            return (
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="editBlock mt-5">
                            <form onSubmit={this.onSubmit} >
                                {renameComponents}
                                <button onClick={this.back} className="btn btn-dark m-1">Back</button>
                                {deleteButton}
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.add) {
            const { errors } = this.state;
            return (
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="editBlock mt-5">
                            <form onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                    error={errors.add}
                                    label="New Topic Name"
                                    onChange={this.onChange}
                                    value={this.state.newName}
                                    field="newName"
                                    type="text"
                                />
                                <button type="submit" className="btn btn-primary m-1">Add</button>
                                <button onClick={this.back} className="btn btn-dark m-1">Back</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        } else {
            var rows = topicNames.map(topic => {
                if (deletetopics === '1') {
                    return <TopicEntry
                        key={topic.topicid}
                        topicID={topic.topicid}
                        topicName={topic.topicname}
                        deleted={topic.deleted}
                        forumURL={forumURL}
                        onClick={this.onClick}
                        group={group}
                        match={match}
                        edittopics={edittopics}
                        deletetopics={deletetopics}
                    />;
                } else if (topic.deleted !== '1') {
                    return <TopicEntry
                        key={topic.topicid}
                        topicID={topic.topicid}
                        topicName={topic.topicname}
                        deleted={topic.deleted}
                        forumURL={forumURL}
                        onClick={this.onClick}
                        group={group}
                        match={match}
                        edittopics={edittopics}
                        deletetopics={deletetopics}
                    />;
                }
            });
        }

        return (
            <div className="topicWrap">
                <div className="row">
                    <div className="col-md">
                        <button onClick={this.add} className="btn btn-primary float-right m-1">Add Topic</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        {rows}
                    </div>
                </div>
            </div>
        );
    }
}

export default Topic