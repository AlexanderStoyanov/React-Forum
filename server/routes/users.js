import express from 'express';
import validateInput from '../shared/validations/signup';
import shortid from 'shortid';
import pg from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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

//Verifies token
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'raccoon')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    req.isAdmin = payload.isAdmin
    next()
}

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
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    if (req.body.isValid) {
        const query = {
            text: 'INSERT INTO users(id, username, password) VALUES($1, $2, $3)',
            values: [shortid.generate(), req.body.username, hashedPassword],
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
    } else {
        res.status(500).send('Username is already taken!');
    }
});

router.post('/signin', (req, res) => {

    const query = {
        text: 'select * from users where username = $1',
        values: [req.body.username],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();

            let passwordIsValid = bcrypt.compareSync(req.body.password, ress.rows[0].password);
            
            if (err) {
                console.log(err.stack);
            } else if (ress.rowCount > 0 && passwordIsValid) {
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