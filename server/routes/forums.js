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
        text: '',
    }
});

export default router;