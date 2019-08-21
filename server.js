
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');

var PORT = process.env.PORT || 3000;

var routes = require('./routes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.connect(MONGODB_URI, function(err) {
    if (err) throw err;
    console.log('mongoose connection success.');
});

app.listen(PORT, function() {
    console.log('App listening on port: ' + PORT);
});
