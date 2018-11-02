var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var request = require('request');
var os = require("os");
var morgan  = require('morgan');

// Set up express
var app = express();
app.use(cookieParser());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(morgan('combined'));

// Configuration and potential overrides
var port = process.env.PORT || 8080;
var title = process.env.TITLE || "AKS Voting App";
var vote1 = process.env.VOTE1VALUE || "Cats";
var vote2 = process.env.VOTE2VALUE || "Dogs";
var showDetails = process.env.SHOWDETAILS || false;
var featureFlag = process.env.FEATUREFLAG || false;
var redisHost = process.env.REDIS_HOST || "voting-storage";
var redisPort = process.env.REDIS_PORT || 6379;
var analyticsHost = process.env.ANALYTICS_HOST || "voting-analytics";
var analyticsPort = process.env.ANALYTICS_PORT || 8080;

// Set up redis
var redis = require('redis');
var redisClient = redis.createClient(redisPort, redisHost, { no_ready_check: true });
redisClient.on('error', function (err) {
  console.log('Could not connect to Redis - ' + err);
});
redisClient.on('connect', function() {
  console.log('Connected to Redis.');
});

function propagateTracingHeaders(req) {
  var headers = {};
  var tracingHeaders = [
    'x-request-id',
    'x-b3-traceid',
    'x-b3-spanid',
    'x-b3-parentspanid',
    'x-b3-sampled',
    'x-b3-flags',
    'x-ot-span-context'
  ];

  for (let header of tracingHeaders) {
    value = req.get(header);
    if (value != undefined) {
      headers[header] = value;
    }
  }
  return headers;
}

// Set up voting-analytics url
var analyticsServerUrl = 'http://' + analyticsHost + ':' + analyticsPort + '/analytics'

// GET - display vote form and analytics
app.get('/', function (req, res) {

  var isFeatureFlagSet = false;
  if (req.cookies && req.cookies.featureflag) {
    isFeatureFlagSet = true;
  }

  request.get( { headers: propagateTracingHeaders(req), url: analyticsServerUrl, json: true }, (analyticsError, analyticsResponse, analyticsBody) => {
    if (analyticsError) { return console.log(analyticsError); }
    var analytics = analyticsBody.text;
    
    res.render('vote', {
      featureFlag: {
        isEnabled: String(featureFlag) == "true",
        isSet: isFeatureFlagSet
      },
      title: title,
      vote1: vote1,
      vote2: vote2,
      analytics: analytics,
      showDetails: { 
        isEnabled: String(showDetails) == "true",
        hostName: os.hostname()
      }
    });
  });
});

// POST - add a new vote, then render vote form and analytics
app.post('/', function (req, res) {

  var vote = req.body['vote'];

  if (vote == 'reset') {

    redisClient.set(vote1, 0);
    redisClient.set(vote2, 0);

  } else {

    redisClient.incr(vote);
    
  }

  res.redirect('/');
});

// POST - set or clear feature flag
app.post('/featureflag/:action(set|clear)', function (req, res) {
  var action = req.params.action;

  if (action === 'set') {
    res.cookie('featureflag', 'on', { expires: new Date(Date.now() + 900000), path: '/' });
  } else {
    res.clearCookie('featureflag', { expires: new Date(Date.now() + 900000), path: '/' });
  }
 
  res.redirect('/');
});

// Set up listener
app.listen(port, function () {
  console.log("Listening on: http://%s:%s", os.hostname(), port);
})
