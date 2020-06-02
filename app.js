require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var forms = multer();
var cors = require('cors');
var hbs = require('express-handlebars');

var indexRouter = require('./routes/index');


var app = express();

//database connection
const config = require('./config/config');
const connectionString = `mongodb://${config.development.db.host}:${config.development.db.port}/${config.development.db.database}`;
mongoose.connect(connectionString);

//onConnection
mongoose.connection.on('connected',()=>{
   console.log('connected to mongo db successfully');
});
mongoose.connection.on('error',(err)=>{
    if(err)
    {
     console.log('connected to mongo db successfully');
    }
});



// view engine setup
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutDir:__dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//middleware
app.use(cors());

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing multipart/form-data
app.use(forms.array()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false })); 



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
