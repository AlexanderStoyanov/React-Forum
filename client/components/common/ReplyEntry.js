import React from 'react';

const ReplyEntry = ({ text, firstname, date, onClick, id, order, groupname, editreplies, deletereplies }) => {
    function createMarkup() {
        return { __html: text };
    }

    function myComponent() {
        return <span dangerouslySetInnerHTML={createMarkup()} />;
    }

    let editButton = null;
    let deleteButton = null;

    if (editreplies === '1') {
        editButton = <button name={id} data-order={order} title="Edit" className="btn btn-secondary mx-1" onClick={onClick} >Edit</button>;
    }
    if (deletereplies === '1') {
        deleteButton = <button name={id} title="Delete" className="btn btn-danger mx-1" onClick={onClick} >Delete</button>;
    }

    return (
        <div className="row">
            <div className="col-md-3">
                <div className="card" style={{backgroundColor: '#444449'}}>
                    <div className="card-body">
                        <h5 className="card-title text-center">{firstname}</h5>
                        <h6 className="card-title text-center">Group: {groupname}</h6>
                        <p className="card-text"> </p>
                    </div>
                </div>
            </div>
            <div className="col-md-9">
                <div className="card p-3 mb-3" style={{backgroundColor: '#444449'}}>
                    <div className="card-header" style={{backgroundColor: '#0000002e'}}>
                        {new Date(Number(date)).toLocaleString()}
                        {
                            (editreplies === '1' || deletereplies === '1') ? 
                            (<div className="float-right">
                            {editButton}
                            {deleteButton}
                        </div>) : (null)
                        }
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            {myComponent()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplyEntry;