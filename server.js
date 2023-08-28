const express = require('express');
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors');
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'PREDATOR HELIOS 300',
      password : 'rieves21',
      database : 'smart-brain'
    }
});

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {

    res.json(database);
});

app.post('/signin', (req, res) => { 
    
    if (req.body.email === database.users[0].email
            && req.body.password === database.users[0].password) {
        
        res.json(database.users[0]);
    } else {

        res.status(400).json('error logging in');
    }
});

app.post('/register', (req, res) => {

    const { name, email, password} = req.body;

    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        
        trx.insert({
            hash: hash,
            email: email
        }, 'email')
        .into('login')
        .then(userEmail => {
            
            return db.insert([
                {
                    name,
                    email: userEmail[0].email,
                    joined: new Date()
                }
            ], '*').into('users')
            .then(user => {
        
                res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch(err => {

        res.status(400).json('Unable to register!');
    });
});

app.get('/profile/:id', (req, res) => {
    
    const { id } = req.params;

    db.select('*')
        .from('users')
        .where({
            id: id
        }).then(user => {

            if (user.length) {

                res.json(user[0]);
            } else {

                res.json('User doesn\'t exist');
            }
        }).catch(err => {

            res.json('Error getting user');
        });
});

app.put('/image', (req, res) => {
    
    const { id } = req.body;
    
    db.select('entries')
        .from('users')
        .where({id})
        .then(user => {

            if (user.length) {

                db('users')
                    .where('id', '=', id)
                    .increment('entries', 1)
                    .then(entries => {
                        
                        res.json('Added entries');
                    })
                    .catch(err => {
                        res.status(400).json('Error getting entries');
                    });
            } else {

                res.json('User doesn\'t exist');
            }

        }).catch(err => {

            res.status(400).json('Error getting user');
        });
});

app.listen(3000, () => {
    
    console.log('App is running in port 3000');
});