const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const register = require('./Controllers/Register.js');
const signin = require('./Controllers/Signin.js');
const profile = require('./Controllers/Profile.js');
const image = require('./Controllers/Image.js');
const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'phaizah',
    password : 'your_database_password',
    database : 'face-recognition'
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', signin.handleSignin(db, bcrypt));

app.post('/register',register.handleRegister(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImage(db));

app.listen(3001, ()=> {
	console.log('app is running on port 3001.');

});




/*

/ --> res= this is working
/signin --> POST = success/fail
/register --> POST = user obj
/profile/:userId --> GET = user
/image --> PUT --> user count


*/