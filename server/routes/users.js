import express from 'express';
import validateInput from '../shared/validations/signup';
import shortid from 'shortid';
import pg from 'pg';
let router = express.Router();

//Database connection
var conString = process.env.ELEPHANTSQL_URL || "postgres://fxnccmwu:UVEOgDD08que1CZcC9L2twa6PxN11Cyo@baasu.db.elephantsql.com:5432/fxnccmwu";
var client = new pg.Client(conString);

//Pooling
import { Pool } from 'pg';
const connectionString = 'postgres://fxnccmwu:UVEOgDD08que1CZcC9L2twa6PxN11Cyo@baasu.db.elephantsql.com:5432/fxnccmwu';
const pool = new Pool({
    connectionString: connectionString,
});


//client.query('CREATE TABLE users(id VARCHAR(10) PRIMARY KEY, username VARCHAR(10) not null unique, password VARCHAR(40) not null)');

//Checks for uniqueness of username; TODO: check uniqueness of email
function userUniquenessCheck(req, res, next) {
    const query = {
        text: 'select * from users where username = $1',
        values: [req.body.username],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, res) => {
            done();

            if (err) {
                console.log(err.stack);
            } else if (res.rows[0] != null) {
                req.body.isValid = false;
                next();
            } else {
                req.body.isValid = true;
                next();
            }
        });
    });


}

router.post('/signup', userUniquenessCheck, (req, res) => {
    if (req.body.isValid) {
        const query = {
            text: 'INSERT INTO users(id, username, password) VALUES($1, $2, $3)',
            values: [shortid.generate(), req.body.username, req.body.password],
        }

        pool.connect((err, client, done) => {
            if (err) throw err
            client.query(query, (err, res) => {
                done();

                if (err) {
                    console.log(err.stack);
                } else {
                    console.log(res);
                }
            });
        });
        res.json({ success: true });
    } else {
        res.status(500).send('Username is already taken!');
    }
});

router.post('/signin', (req, res) => {
    const query = {
        text: 'select * from users where username = $1 and password = $2',
        values: [req.body.username, req.body.password],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err.stack);
            } else if (ress.rowCount > 0) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        });
    });
});

router.get('/:identifier', (req, res) => {
    const query = {
        text: 'select * from users where username = $1',
        values: [req.params.identifier],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            if (err) {
                console.log(err.stack);
            } else if (ress.rowCount > 0) {
                res.json({ user: true });
            } else {
                res.json({ user: false });
            }
        });
    });
});

export default router;