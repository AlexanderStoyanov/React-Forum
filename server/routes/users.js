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


//client.query('CREATE TABLE users(id VARCHAR(10) PRIMARY KEY, username VARCHAR(10) not null, password VARCHAR(40) not null)');

router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
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
        res.status(400).json(errors);
    }
});

export default router;