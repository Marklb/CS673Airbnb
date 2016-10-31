var jwt = require('jsonwebtoken');

const TOKEN_SECRET = 'mkokbnbteam2project';

var db = function(app){
	console.log('Loading db');

	var mysql      = require('mysql');
	var conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		// password : '9993kuo',
		password : '',
		database : 'mokbnb'
	});

	conn.connect(function(err){
		if(!err) {
			console.log("Database is connected ... \n\n");
		} else {
			console.log("Error connecting database ... \n\n");
		}
	});


	/////////////////////////////////////////////////////////////////////////////
	// Attempt to authenticate from token
	/////////////////////////////////////////////////////////////////////////////
	app.get("/api/authenticateFromToken",function(req,res){

		var query_str = 'SELECT S.user_id, U.first_name ' +
	                  'FROM UserSession AS S, Users AS U ' +
	                  'WHERE S.auth_type = ? AND S.session_auth_id = ? ' +
	                    'AND S.user_id = U.user_id';
	  conn.query(query_str, [req.query.authType, req.query.authToken],
			function(err, rows, fields) {
	    if(err){
	      res.json({'veri_success': false});
	    }else{
				res.json({
					'veri_success': true,
					'first_name': rows[0].first_name
				});
	    }
	  });

	});

	/////////////////////////////////////////////////////////////////////////////
	// Login
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/verifyLogin",function(req,res){
		var email = req.body.email;
		var password = req.body.password;

		conn.query('SELECT * from Users WHERE email = ? AND password = ?',
			[email, password], function(err, rows, fields){
			if (!err) {
				// console.log('number of row : ' + rows.length);
				if(rows.length === 1) {

					var user_id = rows[0].user_id;
					var auth_type = 'mokbnb';
					var auth_token = jwt.sign({data: email}, TOKEN_SECRET, {
						expiresIn: '1h'
					});
					// console.log(`Token: ${auth_token}`);

					// Store the user session data
					var query_str ='INSERT INTO `UserSession` (`user_id`, `auth_type`, '+
															'`session_auth_id`) VALUES (?, ?, ?)';
					conn.query(query_str, [user_id, auth_type, auth_token],
						function(err, result) {
								console.log(err);
								console.log(result);
						if (err) console.log(err);
							res.json({
								'veri_success': true,
								'first_name': rows[0].first_name,
								'auth_type': 'mokbnb',
								'auth_token': auth_token
							});
						});
				} else {
					res.json({'veri_success': false});
				}
			} else {
				console.log('Error while performing Query.');
				res.json({'veri_success': false});
			}
		});

	});

	/////////////////////////////////////////////////////////////////////////////
	// Sign up
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/signupinfo",function(req,res){
		var password = req.body.password;
		var fname = req.body.firstname;
		var lname = req.body.lastname;
		var email = req.body.email;
		var gender = 'NULL';
		var bmonth = req.body.birthdaymonth;
		var byear = req.body.birthdayyear;
		var bday = req.body.birthdayday;
		var dob = bday + '-' + bmonth + '-' + byear;

		conn.query(
			'INSERT INTO Users (password,first_name,last_name,email,gender,'+
					'birth_date) VALUES (?, ?, ?, ?, ?, ?)',
			[password, fname, lname, email, gender, dob], function(err, result){
			if (!err) {
				// console.log('Signup was a success');
				var user_id = result.insertId;
				var auth_type = 'mokbnb';
				var auth_token = jwt.sign({data: email}, TOKEN_SECRET, {
					expiresIn: '1h'
				});
				// console.log(`Token: ${auth_token}`);



				// Store the user session data
				var query_str ='INSERT INTO `UserSession` (`user_id`, `auth_type`, '+
													'`session_auth_id`) VALUES (?, ?, ?)';
				console.log(query_str);
				conn.query(query_str, [user_id, auth_type, auth_token],
					function(err, result) {
					if (err) console.log(err);

					conn.query('SELECT `user_id`, `first_name` '+
											'FROM Users '+
											'WHERE `user_id` = ?', [user_id],
						function(err, row, fields) {
							if(err) console.log(err);

							res.json({
								'insert_success': true,
								'first_name': row[0].first_name,
								'auth_type': 'mokbnb',
								'auth_token': auth_token
							});

						});
					});

				// res.json({'insert_success': false});
			} else {
				console.log('Error while performing Query.');
				console.log(err);
				res.json({'insert_success': false});
			}
		});
	});

	/////////////////////////////////////////////////////////////////////////////
	// Get neighborhoods information
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/showneighbor",function(req,res){
		var city = req.body.city;
		conn.query("SELECT street from Address WHERE city=" + "'" + city + "'",
		function(err, rows, fields){
			if (!err) {
				console.log(rows);
				res.json({'query_success': true, 'neighborhoods': rows});
			} else {
				console.log('Error while performing Query.');
				res.json({'query_success': false});
			}
		});
	});

	////////////////////////////////////////////////////////////////////////////
	// Get user information
	//
	// params:
	// 	authToken: (Required) Needed to protect who is accessing user info
	//
	// TODO: Extend customization of into to be returned
	// TODO: Fix query
	/////////////////////////////////////////////////////////////////////////////
	app.get("/api/getUserInfo",function(req,res){
		console.log('/api/getUserInfo');
		console.log(req.query);

		var query_str = 'SELECT U.user_id, U.email, U.first_name, U.last_name, ' +
													'U.addr_id, U.gender, U.birth_date, U.profile_pic ' +
													'U.bio, U.join_date' +
	                  'FROM UserSession AS S, Users AS U ' +
	                  'WHERE S.auth_type = ? AND S.session_auth_id = ? ' +
	                    'AND S.user_id = U.user_id';
	  conn.query(query_str, [req.query.authType, req.query.authToken],
			function(err, rows, fields) {
	    if(err){
	      res.json({'success': false});
	    }else{
				res.json({
					'success': true,
					'user_id': rows[0].user_id,
					'email': rows[0].email,
					'first_name': rows[0].first_name,
					'last_name': rows[0].last_name,
					'addr_id': rows[0].addr_id,
					'gender': rows[0].gender,
					'birth_date': rows[0].birth_date,
					'profile_pic': rows[0].profile_pic,
					'bio': rows[0].bio,
					'join_date': rows[0].join_date
				});
	    }
	  });

		// res.json({'query_success': false});

		// var city = req.body.city;
		// conn.query("SELECT street from Address WHERE city=" + "'" + city + "'",
		// function(err, rows, fields){
		// 	if (!err) {
		// 		console.log(rows);
		// 		res.json({'query_success': true, 'neighborhoods': rows});
		// 	} else {
		// 		console.log('Error while performing Query.');
		// 		res.json({'query_success': false});
		// 	}
		// });
	});

	/////////////////////////////////////////////////////////////////////////////
	// A get request api call
	/////////////////////////////////////////////////////////////////////////////
	app.get('/api/names', function(req, res){
		// Temporary string response until implemented
		res.send('/api/names is not implemented.');
	});

	/////////////////////////////////////////////////////////////////////////////
	// If the api route is requested with no api call then maybe we could
	// list the available api calls
	/////////////////////////////////////////////////////////////////////////////
	app.get('/api', function(req, res){
		// Temporary string response until implemented
		res.send('Available api calls are....');
	});

	/////////////////////////////////////////////////////////////////////////////
	// If an api call was attempted but there is no api call by that name display
	// error page or an
	// error response depending how we want to handle this.
	/////////////////////////////////////////////////////////////////////////////
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
