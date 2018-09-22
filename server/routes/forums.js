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
        text: 'select * from forums',
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
        text: 'INSERT INTO forums(forumid, forumname) VALUES($1, $2)',
        values: [shortid.generate(), req.body.forumName],
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
        text: '',
    }
});

router.post('/rename', (req, res) => {
    const query = {
        text: 'update forums set forumname = $1 where forumid = $2',
        values: [req.body.newForumName, req.body.forumid],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err.stack);
            } else {
                res.status(200).send('Success rename!');
            }
        });
    });
});

export default router;