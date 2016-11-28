const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./auth/setup');
const passport = require('passport');
const session = require('express-session');
const isLoggedIn = require('./auth/logins');
const googleAuth = require('./routes/googleauth');
const login = require('./routes/login');
const access = require('./routes/access');
const submissions = require('./routes/submissions');
const logout = require('./routes/logout');
const imageRouter = require('./routes/imageRouter');

const sessionConfig = {
  secret: 'super secret key goes here', // TODO this info gets stored in ENV file
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false
  }
};

const app = express();
auth.setup();

app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.use('/auth', googleAuth);
app.use('/login',isLoggedIn, login);
app.use('/logout', logout);
app.use('/access', access);
app.use('/submissions', submissions);
app.use('/image', imageRouter);

// everything beyond this point must be authenticated
app.use(ensureAuthenticated);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }else {
    res.sendStatus(401);
    // res.redirect('/');
  }
}

var server = app.listen(3000, function() {
  console.log('Listening on port', server.address().port);
});
