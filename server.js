const express = require('express');
const bcrypt = require('bcrypt-nodejs'); 
const cors = require('cors');
const knex = require('knex');
const db = knex({
    client: 'pg',
    connection: {
      host : 'dpg-cjn07jthe99c73f011eg-a',
      port : 5432,
      user : 'face_recognition_app_db',
      password : 'znUuEZEvdZ6WBNy4WHnfuWbLEBcRJ0hi',
      database : 'face_recognition_app_db_5apq'
    }
});
const registerController = require('./controllers/register');
const signinController = require('./controllers/signin');
const profileController = require('./controllers/profile');
const imageController = require('./controllers/image');
const PORT = process.env.PORT;

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
    
    console.log(`App is running in port 3000`);
});

