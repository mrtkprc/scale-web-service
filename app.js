const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql      = require('mysql');

const vehicleRouter  = require('./routes/vehicle');

const app = express();

//For Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/vehicle/', vehicleRouter);


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


const pool = mysql.createPool({
  connectionLimit: 100,
  host     : '94.73.170.201',
  port     :  3306,
  user     : 'EnesPlt',
  password : 'EnsPlt190711',
  database : 'EnsPlt'
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error)
    console.log("Database connection is not established");
  else
    console.log('The solution is: ', results[0].solution);
});


module.exports = app;
