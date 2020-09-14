const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//middleware
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const fileController = require('./controllers/fileController')

const PORT = 3333;
const app = express();

// websocket
const http = require('http')
const socket = require('socket.io')
const server = http.createServer(app)
const io = socket(server);

//handle parsing of request body
app.use(bodyParser.json());
//cookie parser
app.use(cookieParser());

io.on("connection", socket => {
  console.log('new socket connection! socket id: ', socket.id);
  socket.on('new-ops event', (data) => {
    console.log(data)
    const user = {
      name: data,
      id: socket.id
    };
    io.emit('connected', user)
    io.emit("users", Object.values(users))
  })
})


//serving bundle.js
app.use('/build', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/bundle.js'));
});

//serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//handle file-save requests
app.post('/save-file', fileController.saveFile, (req, res) => {
  res.status(200).send(res.locals.message);
})
//handle sign-up requests
app.post('/signup', userController.checkUsername, userController.encryptPassword, userController.createUser, cookieController.setCookie, (req, res) => {
  //returns a user object
  return res.status(200).json({user: res.locals.user});
});
//handle login requests
app.post('/login', userController.verifyUser, userController.getFiles, cookieController.setCookie, (req, res) => {
  //returns a user object and a files array
  return res.status(200).json({user: res.locals.user, files: res.locals.filesArr});
});
//handle log-out requests
app.post('/logout', (req, res) => {
  return res.clearCookie();
});


app.get('/editor', (req, res) => res.sendFile(path.resolve(__dirname, '../index.html')));




//global error handler
app.use('*', (err, req, res, next) => {
  res.status(404).send(err);
})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

module.exports = app;