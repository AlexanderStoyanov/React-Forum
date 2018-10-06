import React from 'react';

const GroupSelectionEntry = ({ groupID, groupName }) => {
    return (
        <option value={groupID}>{groupName}</option>
    );
}

export default GroupSelectionEntry;