const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser');
const { TestWatcher } = require('@jest/core');
const { hasUncaughtExceptionCaptureCallback } = require('process');
const urlencodedParser = bodyParser.urlencoded({extended: false});

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

app.get('', (req, res) => {
    res.render('homePage', {
        title: 'Powerium',
    })
})

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
    })
})

app.post('/login', urlencodedParser, (req, res) => {
    if(req.body.action == 'Login'){
        //check to make sure valid login credentials here...NEEDS TO BE CODED
        res.redirect('/');

    } else if(req.body.action == 'Register'){
        res.redirect('/register')
    }
})

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Account',
    })
})

app.post('/register', urlencodedParser, (req, res) => {
    res.redirect('/login');
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


app.listen(port, () => {
    console.log('Server is up on port '+port)
})