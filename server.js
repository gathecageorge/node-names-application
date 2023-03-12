if (process.env.NODE_ENV !== 'production') { 
  require('dotenv').config(); 
}
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let flash = require('express-flash');
let session = require('express-session');

const db = require('./database');
var conn;
db().then((res) => {
  conn = res;
});

let os = require("os");
let pod_hostname = os.hostname();

let app = express();
 
app.use(function(req,res,next){
  global.pod_hostname = pod_hostname;
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
app.use(flash());
 
/* GET home page. */
app.get('/', function(req, res, next) {
  let sql=`SELECT * FROM contacts ORDER BY id DESC LIMIT 20`;

  conn.query(sql, (query_err, query_res) => {
    if (query_err) throw query_err;
    
    res.render('contact-us', { title: 'Contact-Us', userData: query_res.rows});
  });  
});
 
app.post('/contact-us', function(req, res, next) {
  let f_name = req.body.f_name;
  let sql = `INSERT INTO contacts (f_name, created_by_pod, created_at) VALUES ($1, $2, NOW())`;

  conn.query(sql, [f_name, pod_hostname], (query_err, query_res) => {
    if (query_err) throw query_err;

    console.log(`${query_res.rowCount} record(s) inserted`);
    req.flash(`success`, `Data added successfully!`);
    res.redirect('/');
  });
});
 
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
 
// expose application on its port
app.listen(process.env.APPLICATION_PORT, function () {
    console.log('Node app is running on port '+process.env.APPLICATION_PORT);
});
 
module.exports = app;