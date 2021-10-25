const path = require('path')
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser');
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
    res.redirect('/');
})

app.get('/inputs', (req, res) => {
    res.render('inputs', {
        title: 'Inputs',
    })
})

app.post('/inputs', urlencodedParser, (req, res) => {
    console.log(req.body);
    res.redirect('/');
})

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