import React from 'react';
import Reply from './Reply';

import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw } from 'draft-js';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const content = {
    "entityMap": {},
    "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }]
};



class RepliesPage extends React.Component {
    constructor(props) {
        super(props);
        const contentState = convertFromRaw(content);
        this.state = {
            contentState,
        }
        this.onContentStateChange = this.onContentStateChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onContentStateChange(contentState) {
        console.log(contentState);
        this.setState({
            contentState,
        });
    };

    onClick(event) {
        event.preventDefault();


    }

    render() {
        let replies = ['Nothing there yet..'];
        if (this.props.reply.replies) {
            replies = this.props.reply.replies[0];
        }
        return (
            <div className="modal fade bd-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Reply
                                replies={replies}
                            />
                            <form>
                                <Editor
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    onContentStateChange={this.onContentStateChange}
                                />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.onClick}>Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        reply: state.reply
    }
}

export default connect(mapStateToProps)(RepliesPage);