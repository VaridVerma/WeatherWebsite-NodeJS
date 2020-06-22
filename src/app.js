const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express ()

// define paths for express config
const publicDirName = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handle bars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirName))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Varid Verma'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Varid Verma'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        helpText : 'There is some helpful text',
        title : 'Help',
        name : 'Varid Verma'
    })
})
app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error : 'please provide address'
        })
    }
    geocode (req.query.address, (error, {Longitude, Latitude, Location} = {}) =>{
        if(error){
            return res.send({ error })
        }
    
        forecast(Longitude, Latitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                address : req.query.address,
                forecast : forecastData,
                Location
            })
          })
    })
   
})

// for matching things which are not yet matched ' * ' -> this is a wildcard characters
// and it should always come in the last

app.get('/help/*', (req,res) => {
    res.render('404', {
        title : '404',
        name : 'Varid Verma',
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name : 'Varid Verma',
        errorMessage : 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})




// app.com         -----------     root route ''
// app.com/help    -----------     help route '/help'
// app.com/about   -----------     root route '/about'
