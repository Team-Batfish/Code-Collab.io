const db = require('../users')
const userController = {};

//check username middleware
userController.checkUsernameAvailability = async (req, res, next) => {
  const {username} = req.body;
  try{
    //set value array and query string
    const values = [username];
    const QUERY = 'SELECT name FROM users WHERE name = $1'

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
  const {username} = req.body;
  const password = res.locals.encryptedPass;

  try{
    //set values array and 
    const values = [username, password];
    const QUERY = 'INSERT INTO users (name, password) VALUES ($1, $2) RETURNING user_id';

    const result = await db.query(QUERY, values);
    res.locals.userId = result.rows[0];

    return next();
  }
  catch(err){
    return next(err);
  }

}

//verify user middleware
//check if DB contains entry with matching username and password