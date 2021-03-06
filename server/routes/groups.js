import express from 'express';
import shortid from 'shortid';

let router = express.Router();

//Pooling
import { Pool } from 'pg';
import { isNull } from 'util';
const connectionString = 'postgres://fxnccmwu:UVEOgDD08que1CZcC9L2twa6PxN11Cyo@baasu.db.elephantsql.com:5432/fxnccmwu';
const pool = new Pool({
    connectionString: connectionString,
});

router.get('/load', (req, res) => {
    const query = {
        text: 'select * from groups order by groupname',
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                res.json(err.stack);
            } else if (ress.rowCount > 0) {
                res.json(ress.rows);
            } else {
                res.status(401);
            }
        });
    });
});

router.post('/add', (req, res) => {
    const query = {
        text: 'insert into groups values($1, $2)',
        values: [shortid.generate(), req.body.newGroupName]
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err) => {
            done();

            if (err) {
                res.json(err.stack);
            } else {
                res.status(200).send({ success: true });
            }
        });
    });
});

router.post('/delete', (req, res) => {
    const query = {
        text: 'delete from groups where groupid = $1;',
        values: [req.body.groupid],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                res.json(err.stack);
            } else {
                res.json({ success: true });
            }
        });
    });
});

router.post('/rename', (req, res) => {
    const query = {
        text: 'update groups set groupname = $1 where groupid = $2',
        values: [req.body.newGroupName, req.body.groupid],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                res.json(err.stack);
            } else {
                res.json({ success: true });
            }
        });
    });
});

router.post('/loadPermissions', (req, res) => {
    //get all groupid in the array
    var arr = Object.keys(req.body);
    for (var i = 0; i < arr.length; i++) {
        const query = {
            text: 'update groups set edittopics = coalesce($2, edittopics), deletetopics = coalesce($3, deletetopics), editreplies = coalesce($4, editreplies), deletereplies = coalesce($5, deletereplies), blocked = coalesce($6, blocked) where groupid = $1',
            values: [
                arr[i],
                req.body[arr[i]].edittopics === true ? '1' : (req.body[arr[i]].edittopics === false ? '0' : null),
                req.body[arr[i]].deletetopics === true ? '1' : (req.body[arr[i]].deletetopics === false ? '0' : null),
                req.body[arr[i]].editreplies === true ? '1' : (req.body[arr[i]].editreplies === false ? '0' : null),
                req.body[arr[i]].deletereplies === true ? '1' : (req.body[arr[i]].deletereplies === false ? '0' : null),
                req.body[arr[i]].blocked === true ? '1' : (req.body[arr[i]].blocked === false ? '0' : null),
            ],
        }
    
        pool.connect((err, client, done) => {
            if (err) throw err
            client.query(query, (err, ress) => {
                done();
    
                if (err) {
                    res.json(err.stack);
                }
            });
        });

    }
    res.json({ success: true });
});

router.get('/loadUserList', (req, res) => {
    const query = {
        text: 'select users.userid, users.username, users.firstname, users.groupid, groups.groupname from users left join groups on users.groupid = groups.groupid order by groupname',
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err.stack);
            } else {
                res.json(ress.rows);
            }
        });
    });
});

router.post('/updateUsers', (req, res) => {
    var arr = Object.keys(req.body);
    for (var i = 0; i < arr.length; i++) {
        if (req.body[arr[i]] !== "Default") {
            const query = {
                text: 'update users set groupid = $2 where userid = $1',
                values: [arr[i], req.body[arr[i]]],
            }
        
            pool.connect((err, client, done) => {
                if (err) throw err
                client.query(query, (err, ress) => {
                    done();
        
                    if (err) {
                        res.json(err.stack);
                    }
                });
            });
        }
    }
    res.json({ success: true });
});

export default router;