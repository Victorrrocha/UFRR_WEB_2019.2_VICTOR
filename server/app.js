global.fetch = require('node-fetch')
const Unsplash = require('unsplash-js').default
const toJson = require('unsplash-js').toJson

const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/APIAuthentication', {useUnifiedTopology: true, useNewUrlParser: true} )
mongoose.set('useCreateIndex', true);

const app = express()

app.use(cors()) 

const unsplash = new Unsplash({
    applicationId: '4fc3997af1e0ec4737c5cbceff4516307411cd096dfd62a81c5727503523441d',
    secret: '49236bade8521918df39108bd422a26fc3ecee9799442bedf75663fd1cbf2feb',
    callbackUrl: 'http://localhost:3000'
})

app.get('/api/photos/random', (req, res) => {
    unsplash.photos
        .listPhotos(1)
        .then(toJson)
        .then(json => res.json(json))
})



app.use(morgan('dev'))
app.use( bodyParser.json())

//Routes
app.use('/users', require('./routes/users'))



module.exports = app