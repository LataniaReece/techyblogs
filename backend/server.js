if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const blogRoutes = require('./routes/blogs.js');
const userRoutes = require('./routes/users.js');
const uploadRoutes = require('./routes/upload.js');
const User = require('./models/user')

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const dbUrl = process.env.DB_URL || 'mongodb+srv://tania:ta123nia456@cluster0.nx2ig.mongodb.net/myBlog2021?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>{
    console.log('Database connected');
});

const secret = process.env.SECRET || 'thisshouldbeabettersecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on('error', function(e){
    console.log('SESSION STORE ERROR', e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) =>{
    res.locals.currentUser = req.user;
    next();
});

app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

// app.all('*', (req, res, next) =>{
//     next(new ExpressError('Page Not Found', 404))
// })

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Listening on port: ${port}`)
});