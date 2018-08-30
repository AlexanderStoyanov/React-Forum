import React from 'react';
import TopicEntry from '../common/TopicEntry';

class Topic extends React.Component {
    constructor(props) {
        super(props);
        //getting forumname to properly construct forum URL
        const path = document.location.pathname;
        const directory = path.substring(path.lastIndexOf('/') + 1, path.length);

        this.state = {
            topicId: '',
            topicName: [],
            //tempTopicName: [],
            forumURL: directory,
            topicURL: '',
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.topicName !== prevState.topicName) {
            console.log('componentDidUpdate');
        }
    }

    load() {
        //hasCodeRunBefore makes getTopics() run only once when /forum/:forumname directory is loaded

        var path = document.location.pathname;
        var directory = path.substring(path.lastIndexOf('/') + 1, path.length);
        let tempTopicName = [];

        localStorage.removeItem("hasCodeRunBefore");
        this.props.getTopics(directory).then(
            (res) => {
                if (!('hasCodeRunBefore' in localStorage)) {
                    let length = Object.keys(res.data.payload).length;


                    for (let i = 0; i < length; i++) {
                        if (directory === res.data.payload[i].forumname) {
                            tempTopicName[i] = res.data.payload[i].topicname;
                        }
                    }
                    this.setState(prevState => ({
                        topicName: [...prevState.topicName, ...tempTopicName],
                        //topicId: [...prevState.topicId, temp.data.payload[i].topicid]
                    }));
                }
                localStorage.setItem("hasCodeRunBefore", true);
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
                topicURL={this.state.topicName[i]}

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