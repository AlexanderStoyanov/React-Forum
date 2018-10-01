import React from 'react';

const UserEntry = ({ userid, firstname, currentGroup, groupSelectionList }) => {
    return (
        <tr>
            <th scope="row">
                {firstname}
            </th>
            <td>
                {currentGroup}
            </td>
            <td>
                
            </td>
        </tr>
    );
}

export default UserEntry;