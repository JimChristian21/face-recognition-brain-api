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

db.select('*')
    .from('users')
    .then(data => console.log(data));

const app = express();

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@test.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@test.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
};



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

    const x = db.insert([
        {
            name: name,
            email: email,
            joined: new Date()
        }
    ], '*').into('users')
    .then(user => {
        console.log(user);
        res.json(user[0]);
    }).catch(err => {
        res.status(400).json('Unable to register');
    });
});

app.get('/profile/:id', (req, res) => {
    
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {

        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });

    if (!found) {

        res.status(400).json('user not found');
    }
});

app.put('/image', (req, res) => {
    
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {

        if (user.id === id) {
            
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });

    if (!found) {

        res.status(400).json('user not found');
    }
});

app.listen(3000, () => {
    
    console.log('App is running in port 3000');
});