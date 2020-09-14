const cookieController = {}

//set ssid cookie
//Occurs on login and sign up
//adds user id (not username) to the ssid cookie
//makes the cookie httpOnly (for security purposes)

cookieController.setCookie = (req, res, next) => {
  res.cookie("ssid", res.locals.user.user_id, {httpOnly: true});
  res.locals.ssid = res.locals.user.user_id;
  return next();
}

module.exports = cookieController;