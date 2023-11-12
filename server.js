const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : 'postgres://facechecker_db_user:hvkStcBDnOjMoH1SNtBxEfWZNIySNUEB@dpg-cl7q5mavokcc73ap1610-a/facechecker_db',
    ssl: { rejectUnauthorized: false },
    host : 'dpg-cl7q5mavokcc73ap1610-a',
    port: '5432',
    user : 'facechecker_db_user',
    password : 'hvkStcBDnOjMoH1SNtBxEfWZNIySNUEB',
    database : 'facechecker_db'
  }
});

const app = express();

app.use(cors())
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

// Test only - when you have a database variable you want to use
app.get('/', (req, res)=> {('its working') })
app.post('/signin', signin.handleSignin(db, bcrypt)) 
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, ()=> {
  console.log(`App is running on port ${process.env.PORT}`);
})
