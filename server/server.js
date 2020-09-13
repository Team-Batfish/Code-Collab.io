const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

//handle sign-up requests
app.post('/signup', (req, res) => {});
//handle login requests
app.post('/login', (req, res) => {});
//handle log-out requests
app.post('/logout', (req, res) => {});



//serving bundle.js
app.use('/build', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});

//serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//global error handler
app.use('*', (err, req, res, next) => {
  res.status(404).send(err);
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

module.exports = app;