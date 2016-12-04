var jwt = require('jsonwebtoken');
var fs = require('fs');

/* For testing script start */
Object.defineProperty(global, 'dbNoRequireCache', {get: function() {
	delete require.cache[require.resolve('./db-no-require-cache')];
	return require('./db-no-require-cache');
}});
/* For testing script end */

const TOKEN_SECRET = 'mkokbnbteam2project';

var mysql      = require('mysql');
var db = function(app){
	console.log('Loading db');

	var conn = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'd927392316',
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
						'first_name': rows[0].first_name,
						'user_id': rows[0].user_id
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
								'user_id': user_id,
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
    console.log('/api/signupinfo');
    if(req.body.auth_type){
      console.log('req.body.auth_type:  ' + req.body.auth_type);
      var fname;
      var lname;
      var email;
      var password;
      if(req.body.auth_type == 'google'){
        fname = req.body.response.profileObj.givenName;
        lname = req.body.response.profileObj.familyName;
        email = req.body.response.profileObj.email;
        password = '909GOOGLE909';
      }else if(req.body.auth_type == 'facebook'){
        var arr = req.body.response.name.split(' ');
        fname = arr[0];
        lname = arr[1];
        email = req.body.response.email;
        password = '909FACEBOOK909';
      }
      console.log(fname);
      console.log(lname);
      console.log(email);
      // TODO: Fix password and birth_date attributes
      conn.query(
  			'INSERT INTO Users (password,first_name,last_name,email,'+
  					'birth_date) VALUES (?, ?, ?, ?, ?)',
  			[password, fname, lname, email, '9-April-1910'], function(err, result){
  			if (!err) {
  				// console.log('Signup was a success');
  				var user_id = result.insertId;
  				var auth_type = req.body.auth_type;
          // TODO: Fix this to use correct token
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
									'user_id': row[0].user_id,
  								'first_name': row[0].first_name,
  								'auth_type': req.body.auth_type,
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
    }else{
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
									'user_id': row[0].user_id,
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
    }
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
	// Get User Trips
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/getUserTrips",function(req,res){
			var clientID = req.body.clientID;
			//Returns place_id, room_name, pictures, booked_date_start, booked_date_end
			var placeQuerySQL = "SELECT place_id, name as room_name, pictures, booked_date_start, booked_date_end FROM reservation"+
			" NATURAL JOIN hostplacelisting"+
			" NATURAL JOIN place"+
			" WHERE client_id = " + clientID;
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

	/////////////////////////////////////////////////////////////////////////////
	// Reject/Cancel Request
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/updateRequest",function(req,res) {
			var req_id = req.body.req_id;
			var val = req.body.val;
			var today = req.body.todays_date;
			if (val === "reject") {
			var handleRequestSQL = "UPDATE clientplacerequest" +
								" SET status = 'rejected', date_resp = ?" +
								" WHERE req_id = ?";
			} else if (val === "cancel") {
			var handleRequestSQL = "UPDATE clientplacerequest" +
								" SET status = 'cancelled', date_resp = ?" +
								" WHERE req_id = ?";
			}
			//Update req_id, place_id, client_id, client_name, ask_amount, resp_time, date_start, date_end, date_req, room_name

			console.log(handleRequestSQL);
			conn.query(handleRequestSQL, [today, req_id], 
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
	
	/////////////////////////////////////////////////////////////////////////////
	// clientPendingRequests
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/clientPendingRequests",function(req,res) {
			var client_id = req.body.user_id;
			//Returns req_id, status, place_id, ask_amount, resp_time, date_start, date_end, date_req, room_name
			var placeQuerySQL = "SELECT req_id, status, place_id, ask_amount, resp_time, date_start, date_end, date_req, place.name as room_name FROM clientplacerequest" +
			" NATURAL JOIN place" +
			" NATURAL JOIN hostplacelisting" +
			" JOIN users ON users.user_id = clientplacerequest.client_id" +
			" WHERE client_id = " + client_id;
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
	
	/////////////////////////////////////////////////////////////////////////////
	// hostPendingRequests
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/hostPendingRequests",function(req,res) {
			var host_id = req.body.user_id; 
			//Returns req_id, place_id, host_id, bookingtype_name, payment_type_id, client_id, client_name, ask_amount, payment_type_id, resp_time, date_start, date_end, date_req, room_name
			var placeQuerySQL = "SELECT req_id, place_id, host_id, client_id, payment_type_id, bookingtype_name, users.name as client_name, ask_amount, resp_time, date_start, date_end, date_req, place.name as room_name FROM clientplacerequest" +
			" NATURAL JOIN place" +
			" NATURAL JOIN hostplacelisting" +
			" NATURAL JOIN bookingtype" +
			" JOIN users ON users.user_id = clientplacerequest.client_id" +
			" WHERE host_id = " + host_id + " AND status = 'pending'";
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
	
	/////////////////////////////////////////////////////////////////////////////
	// Get Host Place Listings
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/getUserListings",function(req,res){
			var host_id = req.body.host_id;
			//Returns place_id, bookingtype_name, date_range_start, date_range_end, room_name, rating, pictures
			var placeQuerySQL = "SELECT place_id, rating, name as room_name, pictures, date_range_start, date_range_end, bookingtype_name FROM place"+
			" NATURAL JOIN hostplacelisting"+
			" NATURAL JOIN bookingtype"+
			" WHERE host_id = " + host_id;
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

	/////////////////////////////////////////////////////////////////////////////
	// Get information about one place
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/getRoomDetailsQuery",function(req,res){
			var placeID = req.body.placeID;
			//Returns place_id, hostID, host_name, gender, birth_date, profile_pic, bio, join_date, roomtype_id, roomtype_name, description, cost_per_night, max_people, bedroomsize, bathroomsize, numofbeds, pictures, addr_id, street, city, state, zip, country, bookingtype_id, bookingtype_name, auction_id, g_price, current_price, sold_price, date_range_start, date_range_end, booked_dates, response_time, ask_amount, languages, amenities
			var placeQuerySQL = "SELECT * FROM (place"+
			" NATURAL JOIN hostplacelisting"+
			" NATURAL JOIN address"+
			" NATURAL JOIN bookingtype"+
			" NATURAL JOIN roomtype"+
			" LEFT JOIN auction ON place.place_id=auction.place_id"+
			" JOIN (SELECT users.name AS host_name, gender, birth_date, profile_pic, bio, join_date FROM place, users WHERE place.host_id=users.user_id) AS A"+
			" JOIN (SELECT GROUP_CONCAT(DISTINCT language_name) AS languages FROM place, language"+
							" JOIN userlanguage WHERE place.host_id=userlanguage.user_id) AS B"+
			" JOIN (SELECT GROUP_CONCAT(DISTINCT amenity_name) AS amenities FROM place, amenity"+
							" JOIN placeamenity WHERE placeamenity.place_id=place.place_id) AS C)"+
			" WHERE place.place_id = " + placeID + " AND auction.active = 'yes' GROUP BY place.place_id"
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
	/////////////////////////////////////////////////////////////////////////////
	// Get place search information
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/get_places",function(req,res){
		dbNoRequireCache.api_get_places(req,res,conn);
	});
	app.post("/api/showplace",function(req,res){
		var state = req.body.state;
		var date_start = req.body.date_start;
		var date_end = req.body.date_end;
		var numofguest = req.body.numofguest;
		var min_cost = req.body.min_cost;
		var max_cost = req.body.max_cost;
		var bedroomsize = req.body.bedroomsize;
		var bathroomsize = req.body.bathroomsize;
		var numofbeds = req.body.numofbeds;
		var roomtype = req.body.checkbox.roomtype;
		var bookingtype = req.body.checkbox.bookingtype;
		var amenity = req.body.checkbox.amenity;
		var hostlanguage = req.body.checkbox.hostlanguage;

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
		placeQuerySQL = "" +
			"SELECT *" +
			" FROM (SELECT placeamenity.amenity_id, A.place_id, A.name, A.pictures, A.bookingtype_id, A.rating, A.roomtype_id, A.cost_per_night" +
					" FROM placeamenity " +
					(amenity_id.length == 0 ? "RIGHT JOIN " : "JOIN ") +
					"(SELECT place.place_id, place.name, amenity_id, pictures, hostplacelisting.bookingtype_id, hostplacelisting.rating, place.roomtype_id, place.cost_per_night" +
												" FROM (place NATURAL JOIN hostplacelisting" +
															" LEFT JOIN placeamenity on place.place_id = placeamenity.place_id" +
                                                            " LEFT JOIN userlanguage on place.host_id = userlanguage.user_id)" +
												" WHERE (addr_id IN (SELECT addr_id" +
																	" FROM address" +
																	" WHERE state = '" + state + "')" +
																		" AND active = 'yes'" +
                                                                        " AND cost_per_night BETWEEN " + (min_cost == -1 ? "0" : min_cost) + " AND " + (max_cost == -1 ? "1000" : max_cost) +
																		" AND max_people >= " + (numofguest == -1 ? "0" : numofguest) +
																		" AND bedroomsize >= " + (bedroomsize == -1 ? "0" : bedroomsize) +
																		" AND bathroomsize >= " + (bathroomsize == -1 ? "0" : bathroomsize) +
																		" AND numofbeds >= " + (numofbeds == -1 ? "0" : numofbeds) +
																		" AND (SELECT DATEDIFF('" + date_start + "', date_range_start)) >= 0 AND (SELECT DATEDIFF(date_range_end, '" + date_end + "')) >= 0" +
																		((roomtype_id.length != 0) ? " AND (" + roomtype_string + ")" : "") +
																		((bookingtype_id.length != 0) ? " AND (" + bookingtype_string + ")" : "") +
																		((language_id.length != 0) ? " AND (" + language_string + ")" : "") + ")";
																		if (amenity_id.length != 0) {
																			placeQuerySQL += " AND amenity_id IN (SELECT amenity_id" +
																							" FROM Amenity" +
																							" WHERE " + amenity_string + ")" +
												" GROUP BY place.place_id) AS A " +
							" on placeamenity.place_id = A.place_id) AS B" +
					" WHERE B.amenity_id IN (SELECT amenity_id" +
											" FROM Amenity" +
											" WHERE " + amenity_string + ")" +
			" GROUP BY B.place_id" +
			" HAVING COUNT(*) = (SELECT COUNT(*)" +
			" FROM Amenity" +
			" WHERE " + amenity_string + ")";
																		} else {
																			placeQuerySQL += ") AS A ON placeamenity.place_id = A.place_id) AS B" +
																							" GROUP BY B.place_id";
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
	// Add new message
	/////////////////////////////////////////////////////////////////////////////
	app.get("/api/add_new_message",function(req,res){
    // console.log('/api/add_new_message');
		var authToken = req.query.authToken;
		var authType = req.query.authType;
		var msgRecipientEmail = req.query.msgRecipientEmail;
		var msgTitle = req.query.msgTitle;
		var msgBody = req.query.msgBody;

		var query_str = 'INSERT INTO Message (sender_id, receiver_id, title, body)' +
										'VALUES ((SELECT user_id ' +
														 'FROM UserSession ' +
														 'WHERE auth_type = ? AND session_auth_id = ?), ' +
														 '(SELECT user_id ' +
                              'FROM Users WHERE email = ?), ' +
                            '?, ?)';

		conn.query(query_str,
      [authType, authToken, msgRecipientEmail, msgTitle, msgBody],
			function(err, rows, fields) {
				if(err){
					console.log(err);
					res.json({'success': false});
				}else{
					// console.log(rows);
					res.json({'success': true});
				}
			});

	});

	/////////////////////////////////////////////////////////////////////////////
	// Get messages
	/////////////////////////////////////////////////////////////////////////////
	app.get("/api/get_user_messages",function(req,res){
    // console.log('/api/get_user_messages');
		var authToken = req.query.authToken;
		var authType = req.query.authType;

		var query_str = `
		SELECT M.message_id,
			M.sender_id, USENDER.first_name AS sender_fname,
			USENDER.email AS sender_email,
			M.receiver_id, URECEIVER.first_name AS receiver_fname,
			URECEIVER.email AS receiver_email,
			M.send_date, M.title, M.body, M.is_read, M.is_stared, M.is_archived,
			S.user_id AS session_user_id

		FROM Message AS M, Users AS USENDER, Users AS URECEIVER,
			(SELECT S.user_id
			 FROM UserSession As S
			 WHERE S.auth_type = ? AND S.session_auth_id = ?) AS S

		WHERE
			(M.sender_id = S.user_id OR M.receiver_id = S.user_id)
			AND
			M.sender_id = USENDER.user_id
			AND
			M.receiver_id = URECEIVER.user_id

		`;

		conn.query(query_str,
      [authType, authToken],
			function(err, rows, fields) {
				if(err){
					console.log(err);
					res.json({'success': false});
				}else{
					var msgs = [];
					for(var i = 0; i < rows.length; i++){
						var row = rows[i];
						msgs.push({
							user_id: row.session_user_id,
							message_id: row.message_id,
							sender: {
								user_id: row.sender_id,
								fname: row.sender_fname,
								email: row.sender_email,
							},
							receiver: {
								user_id: row.receiver_id,
								fname: row.receiver_fname,
								email: row.receiver_email,
							},
							send_date: row.send_date,
							title: row.title,
							body: row.body,
							is_read: row.is_read.lastIndexOf(1) !== -1,
							is_stared: row.is_stared.lastIndexOf(1) !== -1,
							is_archived: row.is_archived.lastIndexOf(1) !== -1
						});
					}
					res.json({'success': true, msgs: msgs});
				}
			});

	});

	/////////////////////////////////////////////////////////////////////////////
	// Upload user profile image
	// TODO: delete old profile picture when setting new
	/////////////////////////////////////////////////////////////////////////////
	app.post('/api/upload_user_profile_image', function(req, res){
		var authToken = req.body.authToken;
		var authType = req.body.authType;
		var imgData = req.body.imgData;

		var match = imgData.match(/^data:image\/(png|gif|jpeg);base64,(.+)$/);
		var fileExt = match[1];
		var base64Data = match[2];

		var uploadedImgsDir = __dirname+'/../../public/images/uploaded_images';
		var userProfilePicsDir = uploadedImgsDir+'/user_profile_pictures';

		// Generate random string
		var crypto = require('crypto');
		var seed = crypto.randomBytes(20);
		var uniqueStr = crypto.createHash('sha1').update(seed).digest('hex');

		var fname = `profile_pic_${uniqueStr}.${fileExt}`;

		var buffer = new Buffer(base64Data, 'base64');

		var filePathFull = userProfilePicsDir+'/'+fname;
		fs.writeFile(filePathFull,buffer,(err) => {
			if(err) throw 'Error: Could not write user profile picture file';
		});


		var query_str = `
		UPDATE Users
		SET profile_pic = ?
		WHERE user_id = (SELECT user_id FROM UserSession
										 WHERE auth_type = ? AND session_auth_id = ?)

		`;

		var profilePicUrl = `/images/uploaded_images/user_profile_pictures/${fname}`;

		conn.query(query_str,
      [profilePicUrl, authType, authToken],
			function(err, rows, fields) {
				if(err){
					console.log(err);
					res.json({'success': false});
				}else{
					res.json({'success': true});
				}
			});

	});

	/////////////////////////////////////////////////////////////////////////////
	// Get user profile image
	/////////////////////////////////////////////////////////////////////////////
	app.get('/api/get_user_profile_image_url', function(req, res){
		var userId = req.query.userId;

		var query_str = `
		SELECT profile_pic
		FROM Users
		WHERE user_id = ?
		`;

		conn.query(query_str,
      [userId],
			function(err, rows, fields) {
				if(err){
					console.log(err);
					res.json({'success': false});
				}else{
					res.json({'success': true, data: {
						profile_pic: rows[0].profile_pic
					}});
				}
			});

	});

	/////////////////////////////////////////////////////////////////////////////
	// Upload place picture
	/////////////////////////////////////////////////////////////////////////////
	app.post('/api/upload_place_image', function(req, res){
		var authToken = req.body.authToken;
		var authType = req.body.authType;
		var imgData = req.body.imgData;
		var place_id = req.body.place_id;

		var match = imgData.match(/^data:image\/(png|gif|jpeg);base64,(.+)$/);
		var fileExt = match[1];
		var base64Data = match[2];

		var uploadedImgsDir = __dirname+'/../../public/images/uploaded_images';
		var userProfilePicsDir = uploadedImgsDir+'/place_pictures';

		// Generate random string
		var crypto = require('crypto');
		var seed = crypto.randomBytes(20);
		var uniqueStr = crypto.createHash('sha1').update(seed).digest('hex');

		var fname = `${uniqueStr}.${fileExt}`;

		var buffer = new Buffer(base64Data, 'base64');

		var filePathFull = userProfilePicsDir+'/'+fname;
		fs.writeFile(filePathFull,buffer,(err) => {
			if(err) throw 'Error: Could not write user profile picture file';
		});


		var query_str = `
		UPDATE Place
		SET pictures = CONCAT_WS(',',?,pictures)
		WHERE host_id = (SELECT user_id FROM UserSession
										WHERE auth_type = ? AND session_auth_id = ?)
				AND
					place_id = ?

		`;

		var placePicUrl = `/images/uploaded_images/place_pictures/${fname}`;
		// console.log(placePicUrl);

		var inserts = [placePicUrl, authType, authToken, place_id];
		query_str = mysql.format(query_str, inserts);
		// console.log(query_str);

		conn.query(query_str, function(err, rows, fields) {
			if(err){
				console.log(err);
				res.json({'success': false});
			}else{
				res.json({'success': true});
			}
		});



	});

  /////////////////////////////////////////////////////////////////////////////
	// Get user reservations
	/////////////////////////////////////////////////////////////////////////////
	app.get("/api/get_user_reservations",function(req,res){
		dbNoRequireCache.api_get_user_reservations(req,res,conn);
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

	/////////////////////////////////////////////////////////////////////////////
	// Add a reservation
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/addreservation",function(req,res){
		var bookingtype = req.body.bookingtype;
		var place_id = req.body.place_id;
		var host_id = req.body.host_id;
		var client_id = req.body.client_id;
		var payment_type_id = req.body.payment_type_id;
		var booked_date_start = req.body.booked_date_start;
		var booked_date_end = req.body.booked_date_end;
		var amt_paid = req.body.amt_paid;
		var paid_date = req.body.paid_date;
		console.log("bookingtype : ", bookingtype);
		console.log("place_id : ", place_id);
		console.log("host_id : ", host_id);
		console.log("client_id : ", client_id);
		console.log("payment_type_id : ", payment_type_id);
		console.log("booked_date_start : ", booked_date_start);
		console.log("booked_date_end : ", booked_date_end);
		console.log("amt_paid : ", amt_paid);
		console.log("paid_date : ", paid_date);
		console.log("sold_price : ", sold_price);
		conn.query("INSERT INTO Reservation" +
					" (place_id, host_id, client_id, payment_type_id, booked_date_start, booked_date_end, amt_paid, paid_date)" +
					" VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
					[place_id, host_id, client_id, payment_type_id, booked_date_start, booked_date_end, amt_paid, paid_date],
		function(err, rows, fields){
			// if (!err) {
				// res.json({'query_success': true});
			// } else {
				// res.json({'query_success': false});
				// console.log(err);
			// }
		});
		if (bookingtype === "Auction") {
			var sold_price = req.body.sold_price;
			conn.query("UPDATE auction" +
						"SET (active='no', sold_price = (SELECT current_price FROM auction WHERE place_id = ? AND active='yes')" +
						"WHERE place_id = ? AND active='yes'",
						[place_id, place_id],
			function(err, rows, fields) {
				// if (!err) {
					// res.json({'query_success': true});
				// } else {
					// res.json({'query_success': false});
				// }
			});
		}
		if (bookingtype === "User-Set Response Time Frame" || bookingtype === "Host-Set Response Time Frame") {
			var currentdate = new Date();
			var currentDateMySQLFormat = (currentdate.getFullYear() + "-" + (((currentdate.getMonth()+1) < 10)?"0":"") + (currentdate.getMonth()+1)  + "-" + ((currentdate.getDate() < 10)?"0":"") + currentdate.getDate());
			var req_id = req.body.req_id;
			
			conn.query("UPDATE clientplacerequest" +
						" SET status = 'accepted', date_resp = ?" +
						" WHERE req_id = ?",
						[currentDateMySQLFormat, req_id],
			function(err, rows, fields) {
				if (!err) {
					res.json({'query_success': true});
				} else {
					res.json({'query_success': false});
				}
			});				
		}
	});

	/////////////////////////////////////////////////////////////////////////////
	// Add a bid
	/////////////////////////////////////////////////////////////////////////////
	app.post("/api/addbid",function(req,res){
		var auction_id = req.body.auction_id;
		var client_id = req.body.client_id;
		var bid_price = req.body.bid_price;
		console.log("auction_id : ", auction_id);
		console.log("client_id : ", client_id);
		console.log("bid_price : ", bid_price);
		conn.query("INSERT INTO ClientAuctionBids" +
					" (auction_id, client_id, bid_price)" +
					" VALUES (?, ?, ?)",
					[auction_id, client_id, bid_price],
		function(err, rows, fields){
			if (!err) {
				res.json({'query_success': true});
			} else {
				res.json({'query_success': false});
				console.log(err);
			}
		});

		conn.query("UPDATE auction SET current_price = ? WHERE auction_id = ?",
					[bid_price, auction_id],
		function(err, rows, fields){
			if (!err) {
				// res.json({'update_success': true});
			} else {
				// res.json({'query_success': false});
				console.log(err);
			}
		});
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
