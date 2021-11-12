if(process.env.NODE_ENV !== 'production') { //going to load all the enviroment variables and set them in process.env
    require('dotenv').config()
}

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser');
const { TestWatcher } = require('@jest/core');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
//New code
const mongoose = require('mongoose')
const localStrategy = require('passport-local').Strategy;
const  ObjectId = require('mongodb').ObjectId;
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://smadsen:smadsen@userinformation.mgssl.mongodb.net/UserInformation?retryWrites=true&w=majority";



const initializePassport = require('./passport-config');
const { assert } = require('console');

initializePassport(
    passport,
    email => users.find(user => user.email === email), //function for finding user based on email
    id => users.find(user => user.id === id)
)

const app = express()
const port = process.env.PORT || 4000

//Connect to MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = "UserInformation";


//Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET|| 'myvaluehere', //a key we keep secret which is going to encrypt all of our info for us
    resave: false, //If nothing has changed, we dont want to resave our session variables hence false
    saveUninitialized: false //We dont want to save an empty value in this session, hence false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('',checkAuthenticated,(req, res) => {
    res.render('homePage', {
        title: 'Powerium',
        logout: 'Log Out',
    })
})

app.get('/login', checkNotAuthenticated,(req, res) => {
    res.render('login', {
        title: 'Login',
        logout: '',
        error: req.flash('error') //For error messages
    })
})

app.post('/login', checkNotAuthenticated,urlencodedParser,passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}), (req,res) => {
    if (req.body.action == 'Register') {
        res.redirect('/register')
    }
})

app.get('/register', checkNotAuthenticated,(req, res) => {
    res.render('register', {
        title: 'Register Account',
    })
})

app.post('/register', checkNotAuthenticated,urlencodedParser, async(req, res) => {
    try {
        const hashedPassword =  await bcrypt.hash(req.body.password, 10)

        await client.connect();
        console.log('Connected Correctly to server');

        const db = client.db(dbName);
        const col = db.collection("user-info");

        let userInfo = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };

        const p = await col.insertOne(userInfo);
    }
    catch {
        res.redirect('/register')
    }
    finally {
        await client.close();
        console.log("Correctly closed client");
        res.redirect('/login')
    }
})

app.get('/inputs', (req, res) => {
    res.render('inputs', {
        title: 'Inputs',
        logout: 'Log Out',
    })
})

app.post('/inputs', urlencodedParser, async (req, res) => {
    try {
        await client.connect();
        console.log('Connected Correctly to server');

        const db = client.db(dbName);
        const col = db.collection("user-inputs");

        let userInputs = {
            DateCreated: Date.now(),
            UserId: req.user._id,
            LEDLights: req.body.lightType,
            NaturalLights: req.body.natType,
            TintUse: req.body.tintUse,
            SmartThermo: req.body.thermoType,
            SmartPlug: req.body.plugType,
            WaterTemp: req.body.waterHeaterName,
            SinkUsage: req.body.sinkUsage,
            ShowerLength: req.body.showerLengthName,
            WaterTemp: req.body.waterTemp,
            AirConditioningTemp: req.body.airConditioningName,
            NumEatingOut: req.body.eatingOutName
        };

        const p = await col.insertOne(userInputs);
    }
    catch {
        res.redirect('/inputs')
    }
    finally {
        await client.close();
        console.log("Correctly closed client");
        res.redirect('/')
    }
})

app.get('/trends', async (req, res) => {

    //Retreive user input information
    await client.connect();
    console.log('Connected Correctly to server');
    const db = client.db(dbName);
    const col = db.collection("user-inputs");
    const user = await col.find({UserId:new ObjectId(req.user._id)}).toArray();
    const userString = JSON.stringify(user);
    await client.close();
    console.log('Disconnected Correctly to server');

    //test
    // const data = JSON.parse(userString);
    // var lengths = [];
    // for(let i = 0; i < data.length; i++){
    //     const tempEntry = data[i];
    //     const tempLength = tempEntry.ShowerLength;
    //     const tempLengthInt = parseInt(tempLength)
    //     lengths.push(tempLengthInt);
    //     console.log(typeof tempLengthInt)
    // }
    // console.log(lengths);

    res.render('trends', {
        title: 'Personalized Trends',
        logout: 'Log Out',
        userMongoDBData: userString,
    })
})

app.get('/suggestions', (req, res) => {
    res.render('suggestions', {
        title: 'Personalized Suggestions',
        logout: 'Log Out',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Powerium',
        logout: 'Log Out',
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Help',
        logout: 'Log Out',
    })
})

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

app.delete('/logout', (req,res) => {
    req.logOut()
    res.redirect('/login')
})

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}


app.listen(port, () => {
    console.log('Server is up on port '+port)
})