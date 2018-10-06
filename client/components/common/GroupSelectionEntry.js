import React from 'react';

const GroupSelectionEntry = ({ groupID, groupName }) => {
    return (
        <option data-id={groupID}>{groupName}</option>
    );
}

export default GroupSelectionEntry;