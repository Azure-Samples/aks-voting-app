var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var os = require("os");
var morgan  = require('morgan');

// Set up express
var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(morgan('combined'));

// Configuration and potential overrides
var port = process.env.PORT || 8080;
var vote1 = process.env.VOTE1VALUE || "Cats";
var vote2 = process.env.VOTE2VALUE || "Dogs";
var redisHost = process.env.REDIS_HOST || "voting-storage";
var redisPort = process.env.REDIS_PORT || 6379;

// Set up redis
var redis = require('redis');
var redisClient = redis.createClient(redisPort, redisHost, { no_ready_check: true });
redisClient.on('error', function (err) {
  console.log('Could not connect to Redis - ' + err);
});
redisClient.on('connect', function() {
  console.log('Connected to Redis.');
});

// GET - display vote form and analytics
app.get('/analytics', function (req, res) {

  redisClient.get(vote1, function (error, reply) {
    if (error) throw error;
    var vote1count = parseInt(reply) || 0;

    redisClient.get(vote2, function (error, reply) {
      if (error) throw error;
      var vote2count = parseInt(reply) || 0;

      var text = vote1 + ': ' + vote1count + ' | ' + vote2 + ': ' + vote2count;
      
      res.json({
        "category1": {
          "name": vote1,
          "count": vote1count
        },
        "category2": {
          "name": vote2,
          "count": vote2count
        },
        "text": text
      });
    });      
  });
});

// Set up listener
app.listen(port, function () {
  console.log("Listening on: http://%s:%s", os.hostname(), port);
})
