const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;
const db = require('./config/mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo');
app.use(express.urlencoded());
app.use(express.static('assets'))

app.use(cookieParser());
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(session({
    name:'assignment',
    secret:'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
       
            mongoUrl:'mongodb://0.0.0.0/assignment_alhansat',
            autoRemove:'disabled'

    },
    function(err){
        console.log(err || 'connect to mongodb ok')
    }
    )
    
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log('(Main index.js) Error in firing the server at port', err);
    }
    console.log('Server is running at port ', port)
    
})