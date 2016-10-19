var db = function(app){
	console.log('Loading db');

	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		// password : '9993kuo',
		password : '',
		database : 'airbnb'
	});

	connection.connect(function(err){
		if(!err) {
			console.log("Database is connected ... \n\n");
		} else {
			console.log("Error connecting database ... \n\n");
		}
	});

	// API series
	// Login verification
	var session_key_counter = 0;
	app.post("/api/verifyLogin",function(req,res){
		var email = req.body.email;
		var password = req.body.password;
		connection.query("SELECT * from Users WHERE email=" + "'" + email + "'" + " AND password=" + "'" + password + "'", function(err, rows, fields){
		//connection.end();
			if (!err) {
				console.log('number of row : ' + rows.length);
				if(rows.length === 1) {
					res.json({'veri_success': true, 'session': session_key_counter++});
//					connection.query("INSERT * from Users WHERE email=" + "'" + email + "'" + " AND password=" + "'" + password + "'", function(err, rows, fields){
//						if (!err) {
//
//						} else {
//
//						}
//					});
				} else {
					res.json({'veri_success': false});
				}
			} else {
				console.log('Error while performing Query.');
				res.json({'veri_success': false});
			}
		});

	});

	// Sign up information inserting
	app.post("/api/signupinfo",function(req,res){
		var username = req.body.username;
		var password = req.body.password;
		var fname = req.body.fname;
		var lname = req.body.lname;
		var name = req.body.name;
		var email = req.body.email;
		var gender = req.body.gender;
		var dob = req.body.dob;
		connection.query(
		"INSERT INTO Users (username,password,Fname,Lname,email,gender,DOB) VALUES (" +
		"'" + username + "'," + "'" + password + "'," + "'" + fname + "'," + "'" + lname +"'," +
		"'" + name + "'," + "'" + email + "'," + "'" + gender + "'," + "'" + dob + "')");
		if (!err) {
			console.log('number of row : ' + rows.length);
		} else {
			console.log('Error while performing Query.');
		}
	});

	// A get request api call
	app.get('/api/names', function(req, res){
		// Temporary string response until implemented
		res.send('/api/names is not implemented.');
	});

	// If the api route is requested with no api call then maybe we could list the available api calls
	app.get('/api', function(req, res){
		// Temporary string response until implemented
		res.send('Available api calls are....');
	});

	// If an api call was attempted but there is no api call by that name display error page or an
	// error response depending how we want to handle this.
	app.get('/api/*', function(req, res){
		// Temporary string response until implemented
		res.send('This api call does not exist.');
	});

	console.log('Done Loading db');
};

var dbInstance = null;
module.exports = {
	start: function(app) {
		if(dbInstance == null){
			dbInstance = new db(app);
		}

		return dbInstance;
	}
}
