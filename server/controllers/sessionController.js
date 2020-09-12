//session db contains
//session ID
//valid/invalid status
//corresponding user id


//verify session
//checks if ssid is in the session table of DB

//create session
//log a new row to the session table in our DB, with status of valid

//delete session
//Occurs on log-out
//deletes row of session table corresponding to session id of user
//(may occur automatically based on postgresql sessions)