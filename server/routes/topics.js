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
        text: 'select * from topics where forumid = $1',
        values: [req.query.forumid],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err.stack);
            } else if (ress.rowCount > 0) {
                let payload = ress.rows;
                
                res.json({ payload });
            } else {
                res.json({ error: true });
            }
        });
    });
});

router.post('/add', (req, res) => {
    const query = {
        text: 'INSERT INTO topics(topicid, topicname, forumid, deleted) VALUES($1, $2, $3, $4)',
        values: [shortid.generate(), req.body.topicName, req.body.forumid, null],
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

router.post('/delete', (req, res) => {
    const query = {
        text: 'update topics set deleted = $1 where topicid = $2;',
        values: [1, req.body.topicid],
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
        text: 'update topics set topicname = $1 where topicid = $2',
        values: [req.body.newTopicName, req.body.topicid],
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