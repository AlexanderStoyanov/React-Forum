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


//CREATE TABLE users(userid VARCHAR(10) PRIMARY KEY, username VARCHAR(10) not null unique, password VARCHAR(100) not null, firstname VARCHAR(20) not null)
//CREATE TABLE forums(forumid VARCHAR(5) PRIMARY KEY, forumname VARCHAR(40) not null)
//CREATE TABLE topics(id VARCHAR(10) PRIMARY KEY, topicname VARCHAR(40) not null, forumid VARCHAR(5))

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

//Checks for uniqueness of username
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
        if (req.body.password === req.body.password2) {
            var hashedPassword = bcrypt.hashSync(req.body.password, 8);
            var id = shortid.generate();
            const query = {
                text: 'INSERT INTO users(userid, username, password, firstname) VALUES($1, $2, $3, $4)',
                values: [id, req.body.username, hashedPassword, req.body.fname],
            }

            pool.connect((err, client, done) => {
                if (err) throw err
                client.query(query, (err, ress) => {
                    done();

                    if (err) {
                        console.log(err.stack);
                    } else {
                        let payload = { subject: id };
                        let token = jwt.sign(payload, 'raccoon', { expiresIn: 86400 });
                        res.json({ success: true, token: token });
                    }
                });
            });
        } else {
            res.status(500).send('Password fields do not match');
        }
    } else {
        res.status(500).send('Username or password cannot be blank');
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
            } else if (!passwordIsValid) { 
                res.status(401).send({ success: false, token: null });
            } else if (ress.rowCount > 0 && passwordIsValid) {
                let payload = { subject: ress.id };
                let token = jwt.sign(payload, 'raccoon', { expiresIn: 86400 });
                res.status(200).send({ success: true, token: token });
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