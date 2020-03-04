var express = require('express')
var path = require('path')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var mockedData = require('./data.json')

var port = process.env.PORT || 9000
var ENTRY_DIR = path.join(__dirname, './dist')
var ENTRY_HTML = path.join(ENTRY_DIR, 'index.html')

const whitelist = ['http://localhost', 'http://127.0.0.1']
var corsOptionsDelegate = function (req, callback) {
  if (!req) {
    callback(null, true)
  } else if (whitelist.indexOf(req.header('Origin')) !== -1) {
    callback(null, true) // reflect (enable) the requested origin in the CORS response
  } else {
    callback(null, false) // disable CORS for this request
  }
}
app.use(bodyParser.json())
app.use(express.static(ENTRY_DIR))
app.get('/company', cors(corsOptionsDelegate), (req, res) => {
  res.send(mockedData)
})
app.get('/company/:id', cors(corsOptionsDelegate), (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.json(mockedData[req.params.id])
})
app.put('/company/:id', cors(corsOptionsDelegate), (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  var activeResId = req.params.id - 1;
  mockedData[activeResId].budget = req.body.budget;
  res.json(mockedData[req.params.id])
})
app.get('/', cors(corsOptionsDelegate), (req, res) => {
  res.sendFile(ENTRY_HTML)
})
app.listen(port, () => {
  console.log('App listening on port: ' + port);
})
