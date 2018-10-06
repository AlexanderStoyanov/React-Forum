import express from 'express';
import shortid from 'shortid';

let router = express.Router();

//Pooling
import { Pool } from 'pg';
const connectionString = 'postgres://fxnccmwu:UVEOgDD08que1CZcC9L2twa6PxN11Cyo@baasu.db.elephantsql.com:5432/fxnccmwu';
const pool = new Pool({
    connectionString: connectionString,
});

router.get('/load', (req, res) => {
    const query = {
        text: 'select * from groups',
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err.stack);
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
                console.log(err);
            } else {
                res.status(200);
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
                console.log(err.stack);
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
                console.log(err.stack);
            } else {
                res.json({ success: true });
            }
        });
    });
});

router.post('/loadPermissions', (req, res) => {
    const query = {
        text: 'update groups set edittopics = $2, deletetopics = $3, editreplies = $4, deletereplies = $5, blocked = $6 where groupid = $1',
        values: [
            req.body.groupid,
            req.body.edittopics, 
            req.body.deletetopics, 
            req.body.editreplies, 
            req.body.deletereplies, 
            req.body.blocked,
        ],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err.stack);
            } else {
                res.json({ success: true });
            }
        });
    });
});

export default router;