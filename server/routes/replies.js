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
    console.log(req.query);
    const query = {
        text: 'select replies.*, users.firstname from replies left join users on replies.userid = users.userid where topicid = $1',
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

export default router;