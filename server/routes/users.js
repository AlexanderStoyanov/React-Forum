import express from 'express';
import shortid from 'shortid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

let router = express.Router();

//Pooling
import { Pool } from 'pg';
const connectionString = 'postgres://fxnccmwu:UVEOgDD08que1CZcC9L2twa6PxN11Cyo@baasu.db.elephantsql.com:5432/fxnccmwu';
const pool = new Pool({
    connectionString: connectionString,
});



//Checks for uniqueness of username
function userUniquenessCheck(req, next) {
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
                client.query(query, (err) => {
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
        text: 'select users.userid, users.password, users.firstname, groups.* from users inner join groups on users.groupid = groups.groupid where username=$1',
        values: [req.body.username],
    }

    pool.connect((err, client, done) => {
        if (err) throw err
        client.query(query, (err, ress) => {
            done();
            
            var passwordIsValid = null;
            if (ress.rows.length > 0) {
                passwordIsValid = bcrypt.compareSync(req.body.password, ress.rows[0].password);
            }

            if (err) {
                console.log(err.stack);
            } else if (!passwordIsValid) { 
                res.status(401).send({ success: false, token: null });
            } else if (ress.rowCount > 0 && passwordIsValid) {
                let payload = { subject: ress.rows[0].userid };
                let token = jwt.sign(payload, 'raccoon', { expiresIn: 86400 });
                res.status(200).send({ 
                    token: token, 
                    name: ress.rows[0].firstname, 
                    groupname: ress.rows[0].groupname, 
                    permissions: { 
                        edittopics: ress.rows[0].edittopics,
                        deletetopics: ress.rows[0].deletetopics,
                        editreplies: ress.rows[0].editreplies,
                        deletereplies: ress.rows[0].deletereplies,
                        blocked: ress.rows[0].blocked,
                     } });
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