const db = require('../database')
var bcrypt = require('bcrypt');

const saltRounds = 10;
const userController = {};

//check username middleware
userController.checkUsername = async (req, res, next) => {

  //get username from request
  const {username} = req.body;
  try{
    //set value array and query string
    const values = [username];
    const QUERY = "SELECT name FROM users WHERE name = $1"

    //query DB for user with specified username
    const result = await db.query(QUERY, values);

    //if user with username already exists
    if(result.rows.length) return next({
      log: "Username Already Exists",
      message: "Please Try Again"
    });

    return next();
  }
  catch(err){
    return next(err);
  }    
}

userController.encryptPassword = async (req, res, next) => {
  const { password } = req.body;
  try{
    //use bcrypt to creat a hashed password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    //add hashed password to res.locals
    res.locals.hashedPassword = hashedPassword;
    
    //move on to next middleware
    return next();

  }
  catch(err){
    return next(err);
  }
}

userController.createUser = async (req, res, next) => {
  //prepair username and password variables
  const {username} = req.body;
  const password = res.locals.hashedPassword;

  try{
    //set values array and 
    const values = [username, password];
    const QUERY = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING user_id, name';

    const result = await db.query(QUERY, values);
    res.locals.user = result.rows[0];

    return next();
  }
  catch(err){
    return next(err);
  }

}

userController.verifyUser = async (req, res, next) => {
  const {username, password} = req.body;
  try{
    //set value array and query string
    const values = [username];
    const QUERY = "SELECT * FROM users WHERE name = $1"
    //query DB for user with specified username
    const result = await db.query(QUERY, values);

    //if user with username already exists
    if(result.rows.length === 0) return next({
      log: "Invalid Username",
      message: "Please Try Again"
    });

    //check hashed password against users attempted password
    const dbPassword = result.rows[0].password;
    const validPassword = await bcrypt.compare(password, dbPassword);

    if(!validPassword) return next({
      log: "Invalid Password",
      message: "Please Try Again"
    });

    //create a user object that doesn't contain the hashed password
    const user = {
      user_id: result.rows[0].user_id,
      name: result.rows[0].name
    }
    //add user to res.locals for response
    res.locals.user = user;

    return next();
  }
  catch(err){
    return next(err);
  }    
}

userController.getFiles = async (req, res, next) => {
  const {user_id} = res.locals.user;
  try{
    //set value array and query string
    const values = [user_id];
    const QUERY = "SELECT * FROM files WHERE owner_id = $1"

    //query DB for user with specified username
    const result = await db.query(QUERY, values);

    //add result onto res.locals.files
    res.locals.filesArr = result.rows;

    console.log('Res.locals.files: ', res.locals.filesArr);

    return next();
  }
  catch(err){
    return next(err);
  }    
};

module.exports = userController;