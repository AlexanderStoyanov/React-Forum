import express from 'express';
import validateInput from '../shared/validations/signup';

let router = express.Router();


var pg = require('pg');
var conString = process.env.ELEPHANTSQL_URL || "	postgres://fxnccmwu:UVEOgDD08que1CZcC9L2twa6PxN11Cyo@baasu.db.elephantsql.com:5432/fxnccmwu";
var client = new pg.Client(conString);
client.connect();

//client.query('CREATE TABLE people(id SERIAL PRIMARY KEY, username VARCHAR(40) not null, password VARCHAR(40) not null)');

//const { Pool } = require('pg');
//const pool = new Pool();
//pool.on('error', (err, client) => {
//    console.error('Unexpected error on idle client', err);
//    process.exit(-1);
//});


router.post('/', (req, res) => {
    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
        res.json({ success: true });
        client.connect();
        const query = {
            text: 'INSERT INTO people(id, username, password) VALUES($1, $2, $3)',
            values: ['1111', 'test1', 'test2@gmail.com'],
        }

        // callback
        client.query(query, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        })

        //client.query('SELECT * FROM people', function (err, result) {
        //    if (err) {
        //        return console.error('error running query', err);
        //    }
        //    console.log(result.rows);
        //    client.end();
        //});
    } else {
        res.status(400).json(errors);
    }
});

export default router;