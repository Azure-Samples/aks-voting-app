var express = require('express');
var handlebars  = require('express-handlebars');
var bodyParser = require('body-parser');
var os = require("os");
var morgan  = require('morgan');

// Set up express
var app = express();
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
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
const redis = require('redis');
const redisClient = redis.createClient({ url: 'redis://' + redisHost + ':' + redisPort })
  .on('error', err => console.log('Redis Client Error', err))
  .on('connect', msg => console.log('Connected to Redis.'));
const start = async () => { await redisClient.connect(); };
start();

// GET - display vote form and analytics
app.get('/analytics', async (req, res) => {

  vote1count = parseInt(await redisClient.get(vote1)) || 0;
  vote2count = parseInt(await redisClient.get(vote2)) || 0;
  var total = vote1count + vote2count;
  var vote1percentage = vote1count == 0 ? 0 : ((vote1count / total) * 100).toFixed(0);
  var vote2percentage = vote2count == 0 ? 0 : ((vote2count / total) * 100).toFixed(0);
  var text = vote1 + ': ' + vote1count + '/' + total + ' (' + vote1percentage + '%) | ' + vote2 + ': ' + vote2count + '/' + total + ' (' + vote2percentage + '%)';

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

// Set up listener
app.listen(port, function () {
  console.log("Listening on: http://%s:%s", os.hostname(), port);
})
