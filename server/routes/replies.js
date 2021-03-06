import express from 'express';
import shortid from 'shortid';
import jwt from 'jsonwebtoken';

let router = express.Router();

//Pooling
import { Pool } from 'pg';
const connectionString = 'postgres://fxnccmwu:UVEOgDD08que1CZcC9L2twa6PxN11Cyo@baasu.db.elephantsql.com:5432/fxnccmwu';
const pool = new Pool({
    connectionString: connectionString,
});

//Verifies token
function verifyToken(req, res, next) {
    if (!req.body.token) {
        return res.status(401).send('Unauthorized request');
    }
    let token = req.body.token;
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'raccoon');
    if (!payload) {
        return res.status(401).send('Unauthorized request');
    }
    req.body.userid = payload.subject;
    req.isAdmin = payload.isAdmin;
    next()
}

router.get('/load', (req, res) => {
    const query = {
        text: 'select replies.*, users.firstname, groups.groupname from replies inner join users on replies.userid = users.userid inner join groups on users.groupid = groups.groupid where topicid = $1 order by date',
        values: [req.query.id],
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

router.post('/post', verifyToken, (req, res) => {
    const query = {
        text: 'INSERT INTO replies(replyid, userid, topicid, text, date) VALUES($1, $2, $3, $4, $5)',
        values: [shortid.generate(), req.body.userid, req.body.topicid, req.body.reply, Date.now().toString()],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err);
            } else {
                res.json({ success: true });
            }
        });
    });
});

router.post('/delete', (req, res) => {
    const query = {
        text: 'DELETE FROM replies WHERE replyid = $1',
        values: [req.body.replyid],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err);
            } else {
                res.json({ success: true });
            }
        });
    });
});

router.post('/update', (req, res) => {
    const query = {
        text: 'UPDATE replies SET text = $1 WHERE replyid = $2',
        values: [req.body.reply, req.body.replyid],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err);
            } else {
                res.json({ success: true });
            }
        });
    });
});

export default router;