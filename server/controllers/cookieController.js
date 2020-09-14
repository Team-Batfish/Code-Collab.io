const cookieController = {}

//res.cookie ssid: res.locals.userid
cookieController.setCookie = (req, res, next) => {
  //sets up the cookie on the response
  res.cookie("ssid", res.locals.user.user_id, {httpOnly: true});
  
  //adds ssid prop to res.locals in case we need for session
  res.locals.ssid = res.locals.user.user_id;
  return next();
}


module.exports = cookieController;