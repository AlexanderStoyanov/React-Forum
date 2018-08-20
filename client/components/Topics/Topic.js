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
        //hasCodeRunBefore makes getForums() run only once when /forum directory is loaded
        localStorage.removeItem("hasCodeRunBefore");
        this.props.getTopics().then(
            (res) => {
                if (!('hasCodeRunBefore' in localStorage)) {

                    //populating forumName array to use it to get all forum names
                    for (let i = 0; i < res.data.payload.length; i++) {
                        this.setState(prevState => ({
                            topicName: [...prevState.topicName, res.data.payload[i].topicname]
                        }));
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