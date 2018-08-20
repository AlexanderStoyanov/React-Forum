import React from 'react';
import TopicEntry from '../common/TopicEntry';

class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicName: '',
            forumURL: '',
            topicURL: '',
        }
    }

    load() {
        //hasCodeRunBefore makes getTopics() run only once when /forum/:forumname directory is loaded
        localStorage.removeItem("hasCodeRunBefore");
        this.props.getTopics().then(
            (res) => {
                if (!('hasCodeRunBefore' in localStorage)) {
                    var path = document.location.pathname;
                    var directory = path.substring(path.lastIndexOf('/') + 1, path.length);
                    //populating forumName array to use it to get all forum names
                    for (let i = 0; i < res.data.payload.length; i++) {

                        //if directory name === forumname that is assigned to a particular topic,
                        //then the topic will be displayed in that forum
                        if (directory === res.data.payload[i].forumname) {
                            this.setState(prevState => ({
                                topicName: [...prevState.topicName, res.data.payload[i].topicname]
                            }));
                        }
                    }
                    localStorage.setItem("hasCodeRunBefore", true);
                }
            },
            (err) => {
                console.log('error');
            }
        );
    }

    render() {
        var rows = [];
        for (var i = 0; i < this.state.topicName.length; i++) {
            rows.push(<TopicEntry
                key={i}
                topicName={this.state.topicName[i]}
                forumURL={this.state.forumURL}
                topicURL={this.state.topicURL}
            />);
        }

        return (
            <div onLoad={this.load()}>
                {rows}
            </div>
        );
    }
}

export default Topic