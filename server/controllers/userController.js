const db = require('../database')
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
  res.locals.encryptedPass = req.body.password;
  return next();
}

userController.createUser = async (req, res, next) => {
  //prepair username and password variables
  const {username, password} = req.body;

  try{
    //set values array and 
    const values = [username, password];
    const QUERY = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING user_id, name';

    const result = await db.query(QUERY, values);
    res.locals.user = result.rows[0];
    console.log('Query result is: ', result);

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
    const values = [username, password];
    const QUERY = "SELECT user_id, name FROM users WHERE name = $1 AND password = $2"

    //query DB for user with specified username
    const result = await db.query(QUERY, values);

    //if user with username already exists
    if(result.rows.length === 0) return next({
      log: "Invalid username or password",
      message: "Please Try Again"
    });

    //add user to res.locals for response
    res.locals.user = result.rows[0];
    console.log('res.locals.user: ', res.locals.user);

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