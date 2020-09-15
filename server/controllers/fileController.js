const db = require('../database');
const fileController = {};


fileController.saveFile = async (req, res, next) => {
	//destructure to get name of file, text of file (in json), and username of user
	let { fileName, fileToSave, username } = req.body;
	//then we set up a pair of database queries, one to get the user's id, and the second to save the file
	const usernameArray = [username];
	const VALUES = [fileName, fileToSave];
	const QUERYtoFindUser = "SELECT user_id FROM users WHERE name=$1";

	//could also get owner_id from the SSID cookie
	
	try {
		const result = await db.query(QUERYtoFindUser, usernameArray);
		//extract the value from the returned result (it comes in as an object with a rows prop)
		const ownerID = result.rows[0].user_id;
		//add ownerID to the VALUES array so that the next db query can access it in the query string
		VALUES.push(ownerID);
	} catch (err) {
		const message = `Error finding user`;
		res.status(500).json(message);
	}
	//the db is expecting just text for the file
	fileToSave = JSON.stringify(fileToSave);
	//$4 was added to the VALUES array in the previous code block as the returned value from first query
	const QUERYtoSave = "INSERT INTO files(name, json, owner_id) VALUES ($1, $2, $3) RETURNING name";

	try {
		const result = await db.query(QUERYtoSave, VALUES);
		//extract the value from the returned result (it comes in as an object with a rows prop)
		const message = result.rows[0].name;
		res.locals.message = `Successfully saved ${message}`;
		return next();
	} catch (err) {
		const message = "Error saving document.";
		res.status(500).send(message);
	}
}

module.exports = fileController;