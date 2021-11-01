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



const initializePassport = require('./passport-config')

initializePassport(
    passport,
    email => users.find(user => user.email === email), //function for finding user based on email
    id => users.find(user => user.id === id)
)

//Storing user data
const users = []



const app = express()
const port = process.env.PORT || 4000

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
    })
})

app.get('/login', checkNotAuthenticated,(req, res) => {
    res.render('login', {
        title: 'Login',
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

// app.post('/login', urlencodedParser, (req, res) => {
//     if(req.body.action == 'Login'){
//         //check to make sure valid login credentials here...NEEDS TO BE CODED
//         res.redirect('/');

//     } else if(req.body.action == 'Register'){
//         res.redirect('/register')
//     }
// })

app.get('/register', checkNotAuthenticated,(req, res) => {
    res.render('register', {
        title: 'Register Account',
    })
})

app.post('/register', checkNotAuthenticated,urlencodedParser, async(req, res) => {
    try {
        const hashedPassword =  await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), //unique identifier, Note: If we have database then this would be automatically generated for us
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    }
    catch {
        res.redirect('/register')
    }
    console.log(users) //To see if we added a user
})

app.get('/inputs', (req, res) => {
    res.render('inputs', {
        title: 'Inputs',
    })
})

app.post('/inputs', urlencodedParser, (req, res) => {
    console.log(req.body);

    // test('Test For Valid Water Heater Temperature', () => {
    //     expect(waterHeaterValid(req.body.waterHeaterTemp)).toBe(true);
    // })

    // test('Test For Valid Shower Length Time', () => {
    //     expect(showerLengthValid(req.body.showerLengthTime)).toBe(true);
    // })

    // test('Test For Valid Air Conditioning Temperature', () => {
    //     expect(airConditioningValid(req.body.airConditioingTemp)).toBe(true);
    // })

    // test('Test For Valid Eating Out Number', () => {
    //     expect(eatingOutValid(req.body.eatingOutNum)).toBe(true);
    // })


    res.redirect('/');
})

function sum(a,b){
    return a+b;
}

app.get('/trends', (req, res) => {
    res.render('trends', {
        title: 'Personalized Trends',
    })
})

app.get('/suggestions', (req, res) => {
    res.render('suggestions', {
        title: 'Personalized Suggestions',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Powerium',
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Help',
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