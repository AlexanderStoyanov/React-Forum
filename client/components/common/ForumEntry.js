import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const ForumEntry = ({ forumName, forumRef }) => {
    return (
        <div class="card">
            <div class="card-body">
                <h1>
                    <a
                        href="#"
                    >
                        {forumName}
                        </a>
                </h1>
            </div>
        </div>
    );
}

ForumEntry.propTypes = {
    forumName: PropTypes.string.isRequired,
}

ForumEntry.defaultProps = {

}

export default ForumEntry;