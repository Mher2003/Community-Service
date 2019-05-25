const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const app = express();
const bcrypt = require('bcrypt');
const fs = require('fs');
const sha256 = require('sha256');
const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');

let data = JSON.parse(fs.readFileSync("data.json"));
let users = JSON.parse(fs.readFileSync("users.json"));

// Body Parser

app.use(bodyParser());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);



// Get request and Send Posts
app.post('/getPosts', function (req, res) {
  res.send([idk(data)]);
});

app.post('/addPost', function (req, res) {
  let user;
  for (let i = 0; i < users.length; i++) {
    if (users[i]['user'] == req['body']['user']) {
      if (users[i]['pass'] == sha256(req['body']['pass'])) {
        // Right user and pass
        user = users[i]['user'];
      } else {
        // Wrong pass, but right user
        res.send(["Wrong Password!"]);
        break;
      }
    }
  }
  if (user) {
    data.push({"uuid":uuidv4(), "title":req['body']['title'], "desc":req['body']['desc'], "branch":req['body']['branch'], "reward":req['body']['reward']});
      fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
      });
    res.send(["Post posted successfully!"]);
  }
});

function idk(data) {
  let h = "";
  for (let i = 0; i < data.length; i++) {
    h+="<div class='post'><h3 class='title'>" + data[i]['title'] + "</h3><p class='desc'>" + data[i]['desc'] + "</p><p class='branch'>Branch:" + data[i]['branch'] + "</p><p class='reward'>Reward:" + data[i]['reward'] + " hours</p></div></br>";
  }
  return h
}

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
