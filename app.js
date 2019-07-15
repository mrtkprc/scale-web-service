const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql      = require('mysql');

//For routes
const companyRouter = require('./routes/company');
const locationRouter = require('./routes/location');
const operatorRouter = require('./routes/operator');
const productRouter = require('./routes/product');
const scaleRouter = require('./routes/scale');
const serialNumberRouter = require('./routes/serial_number');
const vehicleRouter  = require('./routes/vehicle');

const app = express();

const verifyToken = require('./middleware/verify-token');


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


app.use('/api/company/', verifyToken, companyRouter);
app.use('/api/location/', verifyToken, locationRouter);
app.use('/api/operator/', verifyToken, operatorRouter);
app.use('/api/product/', verifyToken, productRouter);
app.use('/api/scale/', verifyToken, scaleRouter);
app.use('/api/serial_number/', verifyToken, serialNumberRouter);
app.use('/api/vehicle/', verifyToken, vehicleRouter);

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
