var bodyParser = require('body-parser');
var express = require('express');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
mongoose.Promise = Promise;

var app = express();
var port = process.env.PORT || 3000;

// Serve static content for the app from the 'public' directory in the
// application directory.
app.use(express.static(__dirname + '/public'));

// // Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.use(bodyParser.json());
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://heroku_k02drlv7:sn5p4kbfpp9c5los079kh89eeh@ds125831.mlab.com:25831/heroku_k02drlv7');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected');
    app.listen(port, function() {
        console.log('listening on ' + port);
    });
});

// get them routes
require('./controllers/nytreact_controller.js')(app);
