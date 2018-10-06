import React from 'react';
import GroupSelectionEntry from './GroupSelectionEntry';

const UserEntry = ({ userid, firstname, currentGroup, groupIDs, groupNames, onChange }) => {
    var rows = [];
    for (var i = 0; i < groupIDs.length; i++) {
        rows.push(<GroupSelectionEntry
            groupID={groupIDs[i]}
            groupName={groupNames[i]}
        />);
    }
    return (
        <tr>
            <th scope="row">
                {firstname}
            </th>
            <td>
                {currentGroup}
            </td>
            <td>
                <div class="form-group">
                    <select class="form-control" id="exampleFormControlSelect1" data-userid={userid} onChange={onChange}>
                    <option>Default</option>
                        {rows}
                    </select>
                </div>
            </td>
        </tr>
    );
}

export default UserEntry;