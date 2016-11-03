var jwt = require('jsonwebtoken');

const TOKEN_SECRET = 'mkokbnbteam2project';

var db = function(app){
	console.log('Loading db');

	var mysql      = require('mysql');
	var conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '9993kuo',
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
	                    'AND S.user_id = U.user_id AND disabled = 0';
	  conn.query(query_str, [req.query.authType, req.query.authToken],
			function(err, rows, fields) {
	    if(err){
	      res.json({'veri_success': false});
	    }else{
				console.log(rows[0]);
				if(rows.length > 0){
					res.json({
						'veri_success': true,
						'first_name': rows[0].first_name
					});
				}else{
					res.json({'veri_success': false});
				}
	    }
	  });

	});

	/////////////////////////////////////////////////////////////////////////////
	// Login
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/verifyLogin",function(req,res){
		var email = req.body.email;
		var password = req.body.password;

		conn.query('SELECT * from Users WHERE email = ? AND password = ? AND ' +
									'disabled = 0',
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
		var bmonth = req.body.birthdaymonth;
		var byear = req.body.birthdayyear;
		var bday = req.body.birthdayday;
		var dob = bday + '-' + bmonth + '-' + byear;

		conn.query(
			'INSERT INTO Users (password,first_name,last_name,email,'+
					'birth_date) VALUES (?, ?, ?, ?, ?)',
			[password, fname, lname, email, dob], function(err, result){
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
	// Disable User Account
	/////////////////////////////////////////////////////////////////////////////
	app.get("/api/disableUserAccount",function(req,res){
		console.log('/api/disableUserAccount');
		console.log(req.query);

		var query_str = 'UPDATE Users ' +
										'SET disabled = true ' +
										'WHERE user_id = (SELECT user_id FROM UserSession ' +
										'WHERE auth_type = \''+ req.query.auth_type + '\' AND ' +
										'session_auth_id = \''+ req.query.auth_token +'\')';
		console.log(query_str);

	  conn.query(query_str, function(err, rows, fields) {
	    if(err){
				console.log(err);
	      res.json({'success': false});
	    }else{
        console.log(rows);
				res.json({
					'success': true
				});
				// console.log(rows);
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

	/////////////////////////////////////////////////////////////////////////////
	// Get place information
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/showplace",function(req,res){
		var state = req.body.state;
		var date_start = req.body.date_start;
		var date_end = req.body.date_end;
		var numofguest = req.body.numofguest;
		var min_cost = req.body.min_cost;
		var max_cost = req.body.max_cost;
		var bedroomsize = req.body.bedroomsize; //add column to place
		var bathroomsize = req.body.bathroomsize; //add column to place
		var numofbeds = req.body.numofbeds; //add column to place
		var roomtype = req.body.checkbox.roomtype; //add column to place
		var bookingtype = req.body.checkbox.bookingtype; //bookingtype = --bookingtype_id in hostplacelisting
		var amenity = req.body.checkbox.amenity; //add column to place
		var hostlanguage = req.body.checkbox.hostlanguage; //add to users, project language from (join users.user_id with hostplacelisting.host_id)

		var bookingtype_id = [];
		var roomtype_id = [];
		var amenity_id = [];
		var language_id = [];

		for (var i = 0 ; i < bookingtype.length ; i++) {
			if (bookingtype[i].checked == "true") {
				bookingtype_id.push( i + 1 );
			}
		}
		console.log(bookingtype_id);

		var bookingtype_string = "";
		for (var i = 0; i < bookingtype_id.length ; i++) {
		        bookingtype_string += ("bookingtype_id = " + bookingtype_id[i]);
		        if ((i + 1) !== bookingtype_id.length) {
		                bookingtype_string += " OR ";
		        }
		}
		console.log(bookingtype_string);

		for (var i = 0 ; i < roomtype.length ; i++) {
			if (roomtype[i].checked == "true") {
				roomtype_id.push( i + 1 );
			}
		}
		console.log(roomtype_id);

		var roomtype_string = "";
		for (var i = 0; i < roomtype_id.length ; i++) {
		        roomtype_string += ("roomtype_id = " + roomtype_id[i]);
		        if ((i + 1) !== roomtype_id.length) {
		                roomtype_string += " OR ";
		        }
		}
		console.log(roomtype_string);

		for (var i = 0 ; i < amenity.length ; i++) {
			if (amenity[i].checked == "true") {
				amenity_id.push( i + 1 );
			}
		}
		console.log(amenity_id);

		var amenity_string = "";
		for (var i = 0; i < amenity_id.length ; i++) {
			amenity_string += ("amenity_id = " + amenity_id[i]);
			if ((i + 1) !== amenity_id.length) {
				amenity_string += " OR ";
			}
		}
		console.log(amenity_string);

		for (var i = 0 ; i < hostlanguage.length ; i++) {
			if (hostlanguage[i].checked == "true") {
				language_id.push( i + 1 );
			}
		}
		console.log(language_id);

		var language_string = "";
		for (var i = 0; i < language_id.length ; i++) {
			language_string += ("language_id = " + language_id[i]);
			if ((i + 1) !== language_id.length) {
				language_string += " OR ";
			}
		}
		console.log(language_string);

		// var bookingtype_id = [];
		// var roomtype_id = [];
		// var amenity_id = [];
		// var language_id = [];

		console.log('bookingtype_id.length ' + bookingtype_id.length);
		console.log('roomtype_id.length ' + roomtype_id.length);
		console.log('amenity_id.length ' + amenity_id.length);
		console.log('language_id.length ' + language_id.length);
		console.log('max_cost ' + max_cost);
		console.log('min_cost ' + min_cost);
		console.log('numofguest ' + numofguest);
		console.log('bedroomsize ' + bedroomsize);
		console.log('bathroomsize ' + bathroomsize);
		console.log(date_start);
		console.log(date_end);
		var placeQuerySQL;
		if (bookingtype_id.length == 0 && roomtype_id.length == 0 && amenity_id.length == 0 && language_id.length == 0
			&& max_cost == -1 && min_cost == -1 && numofguest == -1 && bedroomsize == -1 && bathroomsize == -1
			&& date_start === 'N/A' && date_end === 'N/A') {
				console.log('nothing!!!');
				placeQuerySQL = "" +
				    "SELECT place.name, place.cost_per_night, hostplacelisting.bookingtype_id, place.roomtype_id, place.pictures" +
					" FROM (place join hostplacelisting on place.place_id = hostplacelisting.place_id)";
		}
		else {
			placeQuerySQL = "" +
			"SELECT *" +
			" FROM (SELECT placeamenity.place_id, placeamenity.amenity_id, A.name, A.pictures, A.bookingtype_id, A.roomtype_id, A.cost_per_night" +
					" FROM (placeamenity join (SELECT place.place_id, place.name, amenity_id, place.pictures, hostplacelisting.bookingtype_id, place.roomtype_id, place.cost_per_night" +
												" FROM (place join hostplacelisting on place.place_id = hostplacelisting.place_id" +
															" join userlanguage on place.host_id = userlanguage.user_id" +
															" join placeamenity on place.place_id = placeamenity.place_id)" +
												" WHERE (addr_id = (SELECT addr_id" +
																	" FROM address" +
																	" WHERE state='Texas')" +
																		" AND cost_per_night <= " + max_cost +
																		" AND cost_per_night >= " + min_cost +
																		" AND max_people >= " + numofguest +
																		" AND bedroomsize >= " + bedroomsize +
																		" AND bathroomsize >= " + bathroomsize +
																		" AND numofbeds >= " + numofbeds +
																		" AND (SELECT DATEDIFF('" + date_start + "', date_range_start)) >= 0 AND (SELECT DATEDIFF(date_range_end, '" + date_end + "')) >= 0" +
																		" AND (" + roomtype_string + ")" +
																		" AND (" + bookingtype_string + ")" +
																		" AND (" + language_string + "))" +
																		" AND amenity_id IN (SELECT amenity_id" +
																							" FROM Amenity" +
																							" WHERE " + amenity_string + ")" +
												" GROUP BY place.place_id) AS A" +
							" on placeamenity.place_id = A.place_id)) AS B" +
					" WHERE B.amenity_id IN (SELECT amenity_id" +
											" FROM Amenity" +
											" WHERE " + amenity_string + ")" +
			" GROUP BY B.place_id" +
			" HAVING COUNT(*) = (SELECT COUNT(*)" +
			" FROM Amenity" +
			" WHERE " + amenity_string + ")";
		}

		console.log(placeQuerySQL);
		conn.query(placeQuerySQL,
		function(err, rows, fields){
			if (!err) {
				console.log(rows);
				res.json({'query_success': true, 'result': rows});
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
	// TODO: Extend customization of info to be returned
	/////////////////////////////////////////////////////////////////////////////
	app.get("/api/getUserInfo",function(req,res){
		// console.log('/api/getUserInfo');
		// console.log(req.query);

		// var query_str = 'SELECT U.user_id, U.email, U.first_name, U.last_name, ' +
		// 											'U.addr_id, U.gender, U.birth_date, U.profile_pic ' +
		// 											'U.bio, U.join_date ' +
	  //                 'FROM UserSession AS S, Users AS U ' +
	  //                 'WHERE S.auth_type = ? AND S.session_auth_id = ? ' +
	  //                   'AND S.user_id = U.user_id';
		var query_str = 'SELECT * ' +
	                  'FROM UserSession AS S, Users AS U ' +
	                  'WHERE S.auth_type = ? AND S.session_auth_id = ? AND S.user_id = U.user_id';
		// console.log(query_str);
	  conn.query(query_str, [req.query.authType, req.query.authToken],
			function(err, rows, fields) {
	    if(err){
	      res.json({'success': false});
	    }else{
				// res.json({
				// 	'success': true
				// });
				// console.log(rows);
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
	});

	////////////////////////////////////////////////////////////////////////////
	// Update user information
	//
	// params:
	// 	authToken: (Required) Needed to protect who is changing user info
	// 	(any attrs in attr array):
	/////////////////////////////////////////////////////////////////////////////
	app.get("/api/updateUserInfo",function(req,res){
		console.log('/api/updateUserInfo');
		console.log(req.query);
		var attrs = ['email', 'first_name', 'last_name', 'gender', 'birth_date', 'profile_pic', 'bio'];

		var vals = [];
		for(var attr of attrs){
			if(req.query[attr] !== undefined){
				vals.push({'attr': attr, 'value': req.query[attr]});
			}
		}

		var query_str = 'UPDATE Users ' +
										'SET ';
		for(var i = 0; i < vals.length; i++){
			var val = vals[i];
			query_str += val.attr + ' = \'' + val.value + '\' ';
			if(i !== vals.length-1) query_str += ', ';
		}
		query_str += 'WHERE user_id = (SELECT user_id FROM UserSession ' +
			'WHERE auth_type = \''+ req.query.auth_type + '\' AND ' +
			'session_auth_id = \''+ req.query.auth_token +'\')';
		console.log(query_str);

	  conn.query(query_str, function(err, rows, fields) {
	    if(err){
				console.log(err);
	      res.json({'success': false});
	    }else{
        console.log(rows);
				res.json({
					'success': true
				});
				// console.log(rows);
	    }
	  });
	});

	////////////////////////////////////////////////////////////////////////////
	// Update user password
	//
	// params:
	// 	authToken: (Required) Needed to protect who is changing user info
	// 	old_password:
	// 	new_password:
	/////////////////////////////////////////////////////////////////////////////
	app.get("/api/updateUserPassword",function(req,res){
		console.log('/api/updateUserPassword');
		console.log(req.query);

		var query_str = 'UPDATE Users ' +
										'SET password = \'' + req.query.new_password + '\' ';
										'WHERE user_id = (SELECT user_id FROM UserSession ' +
																			'WHERE auth_type = \''+ req.query.auth_type + '\' AND ' +
																			'session_auth_id = \''+ req.query.auth_token +'\') ' +
													'AND password = \'' + req.query.old_password + '\'';
		console.log(query_str);

	  conn.query(query_str, function(err, rows, fields) {
	    if(err){
				console.log(err);
	      res.json({'success': false});
	    }else{
        console.log(rows);
				res.json({
					'success': true
				});
				// console.log(rows);
	    }
	  });
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
