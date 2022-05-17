// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", verify, (req, res) => {
  res.json({unix: req.unixDate, utc: req.utcDate})
})

function verify(req, res, next) {
  //if date's params not exists
  if(!req.params.date) {
    req.unixDate = new Date().getTime()
    req.utcDate = new Date().toUTCString()
    next()
  } else {
    //if date's params is exists
    //pattern for date string must be YYYY-MM-DD
    let pattern = /\d\d\d\d-\d\d-\d\d/
    let date_string = req.params.date
    //if params is timestamp, make sure it can converted to number
    let toNumber = Number(req.params.date) 
       if(!pattern.test(date_string) && Number.isNaN(toNumber)) {
      return res.json({error: 'Invalid date'})
    } else {
    if(pattern.test(date_string)) {
      req.unixDate = new Date(date_string).getTime()
      req.utcDate = new Date(date_string).toUTCString()
      next()
} else if(!Number.isNaN(toNumber)) {
      req.unixDate = new Date(toNumber).getTime()
      req.utcDate = new Date(toNumber).toUTCString()
      next()
}
      
    }
  }
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});