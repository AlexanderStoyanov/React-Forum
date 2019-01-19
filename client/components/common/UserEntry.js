import React from 'react';

const UserEntry = ({ userid, username, firstname, currentGroup, groupSelectionArray, onChange }) => {
    return (
        <tr>
            <th scope="row">
                 {username} ({firstname})
            </th>
            <td>
                {currentGroup}
            </td>
            <td>
                <div className="form-group">
                    <select className="form-control" id="exampleFormControlSelect1" data-userid={userid} onChange={onChange}>
                    <option>Default</option>
                        {groupSelectionArray}
                    </select>
                </div>
            </td>
        </tr>
    );
}

export default UserEntry;