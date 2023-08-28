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
const registerController = require('./controllers/register');
const signinController = require('./controllers/signin');
const profileController = require('./controllers/profile');
const imageController = require('./controllers/image');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {

    
});

app.post('/signin', (req, res) => {signinController.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {registerController.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profileController.getProfile(req, res, db)});

app.put('/image', (req, res) => {imageController.incrementEntries(req, res, db)});

app.listen(3000, () => {
    
    console.log('App is running in port 3000');
});