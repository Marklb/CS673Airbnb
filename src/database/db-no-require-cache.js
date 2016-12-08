var mysql = require('mysql');

module.exports.api_get_places = function(req,res,conn){
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
  // console.log('\n\nINPUT START');
  // console.log('---[state]---');
  // console.log(state);
  // console.log('---[date_start]---');
  // console.log(date_start);
  // console.log('---[date_end]---');
  // console.log(date_end);
  // console.log('---[numofguest]---');
  // console.log(numofguest);
  // console.log('---[min_cost]---');
  // console.log(min_cost);
  // console.log('---[max_cost]---');
  // console.log(max_cost);
  // console.log('---[bedroomsize]---');
  // console.log(bedroomsize);
  // console.log('---[bathroomsize]---');
  // console.log(bathroomsize);
  // console.log('---[numofbeds]---');
  // console.log(numofbeds);
  // console.log('---[roomtype]---');
  // console.log(roomtype);
  // console.log('---[bookingtype]---');
  // console.log(bookingtype);
  // console.log('---[amenity]---');
  // console.log(amenity);
  // console.log('---[hostlanguage]---');
  // console.log(hostlanguage);
  // console.log('INPUT END\n');


  var query_str =  `
  SELECT *
  FROM Place AS P NATURAL JOIN HostPlaceListing AS HPL NATURAL JOIN Address AS A
  WHERE
      P.addr_id IN (SELECT A1.addr_id
                      FROM Address AS A1
                      WHERE A1.state = ? /* state */)
      AND
        (HPL.date_range_start <= ? /* date_start */
        AND
        HPL.date_range_end >= ? /* date_end */)
      AND
		HPL.active = 'yes'
	  AND
        (SELECT COUNT(*)
        FROM Reservation AS R1
        WHERE
            P.place_id = R1.place_id
          AND
            ((R1.booked_date_start BETWEEN ? /* date_start */ AND ? /* date_end */)
              OR
            (R1.booked_date_end BETWEEN ? /* date_start */ AND ? /* date_end */))) <= 0
    `;
    var inserts = [state, date_start, date_end, date_start, date_end,
                   date_start, date_end];
    query_str = mysql.format(query_str, inserts);

    //-------------------------------
    // Number of guests
    //-------------------------------

    if(numofguest && numofguest >= 0){
      query_str += `
        AND
          P.max_people >= ? /* numofguest */
      `;
      var inserts = [numofguest];
      query_str = mysql.format(query_str, inserts);
    }

    //-------------------------------
    // Cost
    //-------------------------------

    if(min_cost && max_cost && min_cost >= 0 && max_cost >= 0 && min_cost <= max_cost){
      query_str += `
        AND
          P.cost_per_night BETWEEN ? /* min_cost */ AND ? /* max_cost */
      `;
      var inserts = [min_cost, max_cost];
      query_str = mysql.format(query_str, inserts);
    }

    //-------------------------------
    // Bedroom size
    //-------------------------------

    if(bedroomsize && bedroomsize >= 0){
      query_str += `
        AND
          P.bedroomsize >= ? /* bedroomsize */
      `;
      var inserts = [bedroomsize];
      query_str = mysql.format(query_str, inserts);
    }

    //-------------------------------
    // Bathroom size
    //-------------------------------

    if(bathroomsize && bathroomsize >= 0){
      query_str += `
        AND
          P.bathroomsize >= ? /* bathroomsize */
      `;
      var inserts = [bathroomsize];
      query_str = mysql.format(query_str, inserts);
    }

    //-------------------------------
    // Number of beds
    //-------------------------------

    if(numofbeds && numofbeds >= 0){
      query_str += `
        AND
          P.numofbeds >= ? /* numofbeds */
      `;
      var inserts = [numofbeds];
      query_str = mysql.format(query_str, inserts);
    }

    //-------------------------------
    // Roomtype
    //-------------------------------

    var roomtypeLOOKUP = {
      'Entire home': 1,
      'Private room': 2,
      'Shared room': 3
    };
    var roomtype_id_list = roomtype.map(function(val, i){
      if(val.checked == 'true'){return roomtypeLOOKUP[val.name]}
    });
    roomtype_id_list = roomtype_id_list.filter(function(val, i){
      return val !== undefined;
    });

    if(roomtype_id_list && roomtype_id_list.length > 0){
      query_str += `
        AND
          P.roomtype_id IN (?) /* roomtype_id_list */
      `;
      var inserts = [roomtype_id_list];
      query_str = mysql.format(query_str, inserts);
    }

    //-------------------------------
    // Booking type
    //-------------------------------

    var bookingtypeLOOKUP = {
      'Instant Book': 1,
      'Auction': 2,
      'User-set Time Frame': 3,
      'Host-set Time Frame': 4
    };
    var bookingtype_id_list = bookingtype.map(function(val, i){
      if(val.checked == 'true'){return bookingtypeLOOKUP[val.name]}
    });
    bookingtype_id_list = bookingtype_id_list.filter(function(val, i){
      return val !== undefined;
    });

    if(bookingtype_id_list && bookingtype_id_list.length > 0){
      query_str += `
        AND
          HPL.bookingtype_id IN (?) /* bookingtype_id_list */
      `;
      var inserts = [bookingtype_id_list];
      query_str = mysql.format(query_str, inserts);
    }

    //-------------------------------
    // Amenity
    //-------------------------------

    var amenityLOOKUP = {
      'Wireless Internet': 1,
      'Pool': 2,
      'Kitchen': 3,
      '24-hour check-in': 4,
      'Air conditioning': 5,
      'Buzzer/wireless intercom': 6,
      'Cable TV': 7,
      'Carbon monoxide detector': 8,
      'Doorman': 9,
      'Doorman Entry': 10,
      'Dryer': 11,
      'Elevator in building': 12,
      'Essentials': 13,
      'Family/kid friendly': 14,
      'Fire extinguisher': 15,
      'First aid kit': 16,
      'Free parking on premises': 17,
      'Free parking on street': 18,
      'Gym': 19,
      'Hair dryer': 20,
      'Hangers': 21,
      'Heating': 22,
      'Hot tub': 23,
      'Indoor fireplace': 24,
      'Internet': 25,
      'Iron': 26,
      'Keypad': 27,
      'Laptop friendly workspace': 28,
      'Lock on bedroom door': 29,
      'Lockbox': 30,
      'Pets allowed': 31,
      'Safety card': 32,
      'Shampoo': 33,
      'Smartlock': 34,
      'Smoke detector': 35,
      'Smoking allowed': 36,
      'Suitable for events': 37,
      'TV': 38,
      'Washer': 39,
      'Wheelchair accessible': 40
    };
    var amenity_id_list = amenity.map(function(val, i){
      if(val.checked == 'true'){return amenityLOOKUP[val.name]}
    });
    amenity_id_list = amenity_id_list.filter(function(val, i){
      return val !== undefined;
    });

    if(amenity_id_list && amenity_id_list.length > 0){
      query_str += `
        AND
          P.place_id IN (SELECT P2.place_id
                        FROM Place AS P2
                        JOIN PlaceAmenity AS PA1
                        ON P2.place_id = PA1.place_id
                        WHERE PA1.amenity_id IN (?) /* amenity_id_list */
                        GROUP BY P2.place_id
                        HAVING COUNT(*) = ?) /* amenity_id_list.length */
      `;
      var inserts = [amenity_id_list, amenity_id_list.length];
      query_str = mysql.format(query_str, inserts);
    }

    //-------------------------------
    // Language
    //-------------------------------

    var languageLOOKUP = {
      'English': 1,
      'Español': 2,
      'Français': 3,
      'Bahasa Indonesian': 4,
      'Bahasa Malaysia': 5,
      'Bengali': 6,
      'Dansk': 7,
      'Deutsch': 8,
      'Hindi': 9,
      'Italiano': 10,
      'Magyar': 11,
      'Nederlands': 12,
      'Norsk': 13,
      'Polski': 14,
      'Português': 15,
      'Punjabi': 16,
      'Sign Language': 17,
      'Suomi': 18,
      'Svenska': 19
    }
    var language_id_list = hostlanguage.map(function(val, i){
      if(val.checked == 'true'){return languageLOOKUP[val.name]}
    });
    language_id_list = language_id_list.filter(function(val, i){
      return val !== undefined;
    });

    if(language_id_list && language_id_list.length > 0){
      query_str += `
        AND
          P.host_id IN (SELECT P3.host_id
                        FROM Place AS P3
                        JOIN UserLanguage AS UL1
                        ON P3.host_id = UL1.user_id
                        WHERE UL1.language_id IN (?) /* language_id_list */
                        GROUP BY P3.place_id
                        HAVING COUNT(*) = ?) /* language_id_list.length */
      `;
      var inserts = [language_id_list, language_id_list.length];
      query_str = mysql.format(query_str, inserts);
    }

    //-------------------------------
    // Do query
    //-------------------------------

    console.log(query_str);

    conn.query(query_str, function(err, rows, fields){
      if (!err) {
        console.log(rows);
        res.json({'query_success': true, 'result': rows});
      } else {
        console.log('Error while performing Query[/api/get_places].');
        res.json({'query_success': false});
      }
    });

};

module.exports.api_get_user_reservations = function(req,res,conn){
  // console.log('/api/get_user_reservations');
  var authToken = req.query.authToken;
  var authType = req.query.authType;
  var user_id = req.body.user_id;
  console.log(req.body.user_id+"---------");
  var query_str = `
  SELECT place_id, place.name as room_name, host_id, U.name as host_name,
        client_id, S.name as client_name, booked_date_start, booked_date_end,
        amt_paid, paid_date
  FROM ((place NATURAL JOIN Reservation)
        JOIN Users U ON host_id = U.user_id)
        JOIN Users S ON client_id = S.user_id
  WHERE host_id = (SELECT Distinct user_id FROM UserSession WHERE user_id = ? )
  `;

  conn.query(query_str, [user_id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.json({ 'success': false });
      } else {
        console.log(rows);
        //var reservations = [];
        //for (var i = 0; i < rows.length; i++) {
        // reservations.push(rows[0]);
        //}
        res.json({ 'success': true, result: rows });
      }
    });
}

module.exports.api_get_user_reservations2 = function(req,res,conn){
  // console.log('/api/get_user_reservations');
  var authToken = req.query.authToken;
  var authType = req.query.authType;
  var user_id = req.body.user_id;
  var query_str = `
  SELECT place_id, place.name as room_name, host_id, U.name as host_name, client_id, S.name as client_name, booked_date_start, booked_date_end, amt_paid, paid_date
  FROM ((place NATURAL JOIN Reservation)  JOIN Users U ON host_id = U.user_id) JOIN Users S ON client_id = S.user_id
  WHERE client_id = (SELECT Distinct user_id FROM UserSession WHERE user_id = ? )

  `;

  conn.query(query_str, [user_id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.json({ 'success': false });
      } else {
        console.log(rows);
        //var reservations = [];
        //for (var i = 0; i < rows.length; i++) {
        // reservations.push(rows[0]);
        //}
        res.json({ 'success': true, result: rows });
      }
    });
}

module.exports.api_get_user_income = function(req,res,conn){
  // console.log('/api/get_user_reservations');
  var authToken = req.query.authToken;
  var authType = req.query.authType;
  var user_id = req.body.user_id;
  var query_str = `
  SELECT SUM(amt_paid) AS income
  FROM Reservation
  WHERE host_id = (SELECT Distinct user_id FROM UserSession WHERE user_id = ? )

  `;

  conn.query(query_str, [user_id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.json({ 'success': false });
      } else {
        console.log(rows);
        //var reservations = [];
        //for (var i = 0; i < rows.length; i++) {
        // reservations.push(rows[0]);
        //}
        res.json({ 'success': true, result: rows });
      }
    });
}

module.exports.api_get_user_expense = function(req,res,conn){
  // console.log('/api/get_user_reservations');
  var authToken = req.query.authToken;
  var authType = req.query.authType;
  var user_id = req.body.user_id;
  var query_str = `
  SELECT SUM(amt_paid) AS expense
  FROM Reservation
  WHERE client_id = (SELECT Distinct user_id FROM UserSession WHERE user_id = ? )

  `;

  conn.query(query_str, [user_id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.json({ 'success': false });
      } else {
        console.log(rows);
        //var reservations = [];
        //for (var i = 0; i < rows.length; i++) {
        // reservations.push(rows[0]);
        //}
        res.json({ 'success': true, result: rows });
      }
    });
}

module.exports.update_listing_data = function(req,res,conn){
  console.log('\n\n\n\n\n\n\n\n\nupdate_listing_data');
  var auth_type = req.body.auth_type;
  var auth_token = req.body.auth_token;
  var place_id = parseInt(req.body.place_id);
  console.log(auth_token);
  console.log(auth_type);
  console.log(place_id);

  console.log(req.body);
  var street = req.body.street;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var country = req.body.country;

  var room_name = req.body.room_title;
  var room_description = req.body.description;
  var date_start = req.body.date_start;
  var date_end = req.body.date_end;
  var locationLatLng = req.body.locationLatLng;

  var max_people = req.body.max_people;
  var cost_per_night = req.body.cost_per_night;
  var response_time = req.body.response_time;
  var bedroomsize = req.body.bedroomsize;
  var bathroomsize = req.body.bathroomsize;
  var numofbeds = req.body.numofbeds;
  var roomtype_id = parseInt(req.body.roomtype_id);
  var bookingtype_id = req.body.bookingtype_id;
  // var amenity_ids = req.body.amenity_id;
  // var amenity_ids_to_add = req.body.amenity_ids_to_add;
  // var amenity_ids_to_del = req.body.amenity_ids_to_del;
  var amenity_ids = (req.body.amenity_ids+'').split(',');
  var amenity_ids_to_add = (req.body.amenity_ids_to_add+'').split(',');
  var amenity_ids_to_del = (req.body.amenity_ids_to_del+'').split(',');
  if(amenity_ids == undefined || amenity_ids == "undefined"){amenity_ids = [];}
  if(amenity_ids_to_add == undefined || amenity_ids_to_add == "undefined"){amenity_ids_to_add = [];}
  if(amenity_ids_to_add == undefined || amenity_ids_to_add == "undefined"){amenity_ids_to_add = [];}

  var paidExtrasToAdd = req.body.paidExtrasToAdd;
  var paidExtrasToDel = req.body.paidExtrasToDel;
  console.log(paidExtrasToAdd);
  console.log(paidExtrasToDel);
  // console.log(paidExtrasToDel.length);

  var is_booking_active = req.body.is_booking_active;
  var paidExtras = req.body.paidExtras;
  var end_auction_time = req.body.end_auction_time;
  console.dir(roomtype_id);

  var promises = [];


  var get_user_id_query_str = `
  (SELECT USES.user_id
  FROM UserSession AS USES
  WHERE USES.auth_type = ? AND USES.session_auth_id = ?)`;

  get_user_id_query_str = mysql.format(get_user_id_query_str, [
  auth_type, auth_token]);
  console.log('----------------1-------------------');
  console.log(get_user_id_query_str);
  console.log('----------------2-------------------');
  var query_str1 = `
  Update HostPlaceListing SET ?
  WHERE
    host_id = @authed_user_id
  AND
    place_id = ?
  `;
  var vals1 = {};
  if(bookingtype_id !== undefined)vals1['bookingtype_id'] = parseInt(bookingtype_id);
  if(date_start !== undefined)vals1['date_range_start'] = date_start;
  if(date_end !== undefined)vals1['date_range_end'] = date_end;
  if(is_booking_active != undefined){
    vals1['active'] = (is_booking_active == true || is_booking_active == 'true') ? 'yes' : 'no';
  }
  console.log('----------------3-------------------');
  console.log(vals1);
  console.log('----------------4-------------------');
  query_str1 = query_str1.replace('@authed_user_id', get_user_id_query_str)
  console.log(query_str1);
  console.log('----------------5-------------------');
  query_str1 = mysql.format(query_str1, [vals1, place_id]);
  console.log('----------------7-------------------');
  console.log(query_str1);
  console.log('----------------8-------------------');
  var p1 = new Promise(function(resolve, reject) {
    conn.query(query_str1, function(err, result){
      if (!err) {
        // resolve("[query_str1]Stuff worked!");
        resolve(result);
        // console.log(result);
        // res.json({ 'success': true });
      } else {
        reject(Error("[query_str1]It broke1"));
        // res.json({ 'success': false });
      }
    });
  });
  promises.push(p1);



  var query_str2 = `
  Update Place SET ?
  WHERE place_id = ?
  `;
  var vals2 = {};
  if(roomtype_id !== undefined)vals2['roomtype_id'] = parseInt(roomtype_id);
  if(room_name !== undefined)vals2['name'] = room_name;
  if(room_description !== undefined)vals2['description'] = room_description;
  if(response_time !== undefined)vals2['response_time'] = parseInt(response_time);
  if(cost_per_night !== undefined)vals2['cost_per_night'] = parseFloat(cost_per_night);
  if(max_people !== undefined)vals2['max_people'] = parseInt(max_people);
  if(bedroomsize !== undefined)vals2['bedroomsize'] = parseFloat(bedroomsize);
  if(bathroomsize !== undefined)vals2['bathroomsize'] = parseInt(bathroomsize);
  if(numofbeds !== undefined)vals2['numofbeds'] = parseInt(numofbeds);
  query_str2 = mysql.format(query_str2, [vals2, parseInt(place_id)]);
  console.log(query_str2);
  var p2 = new Promise(function(resolve, reject) {
  	conn.query(query_str2, function(err, result){
  		if (!err) {
  			// resolve("[query_str2]Stuff worked!");
  			resolve(result);
  		} else {
  			reject(Error("[query_str2]It broke"));
  		}
  	});
  });
  promises.push(p2);




  var query_str3 = `
  Update Address SET ?
  WHERE addr_id = (SELECT P.addr_id FROM Place AS P WHERE P.place_id = ?)
  `;
  var vals3 = {};
  if(street !== undefined)vals3['street'] = street;
  if(city !== undefined)vals3['city'] = city;
  if(state !== undefined)vals3['state'] = state;
  if(zip !== undefined)vals3['zip'] = zip;
  if(country !== undefined)vals3['country'] = country;
  console.log(locationLatLng);
  if(locationLatLng !== undefined){
    console.log('-----');
    if(locationLatLng.lng !== undefined)vals3['latitude'] = parseFloat(locationLatLng.lat);
    if(locationLatLng.lng !== undefined)vals3['longitude'] = parseFloat(locationLatLng.lng);
  }
  console.log(vals3);
  query_str3 = mysql.format(query_str3, [vals3, parseInt(place_id)]);
  console.log(query_str3);
  var p3 = new Promise(function(resolve, reject) {
  	conn.query(query_str3, function(err, result){
  		if (!err) {
  			// resolve("[query_str3]Stuff worked!");
  			resolve(result);
  		} else {
  			reject(Error("[query_str3]It broke"));
  		}
  	});
  });
  promises.push(p3);



  if(req.body.amenity_ids_to_add !== undefined){
    var query_str4 = `
    INSERT INTO PlaceAmenity (place_id, amenity_id)
    VALUES ?
    `;

    var vals4 = [];
    if(amenity_ids_to_add !== undefined){
      console.log(amenity_ids_to_add);
      for(var i = 0; i < amenity_ids_to_add.length; i++){
        if(amenity_ids_to_add[i] != undefined  && amenity_ids_to_add[i] != "undefined"){
          vals4.push([parseInt(place_id), parseInt(amenity_ids_to_add[i])]);
        }
      }
    }
    query_str4 = mysql.format(query_str4, [vals4]);
    console.log('------==');
    console.log(query_str4);
    console.log('------==');
    var p4 = new Promise(function(resolve, reject) {
      conn.query(query_str4, function(err, result){
        if (!err) {
          // resolve("[query_str4]Stuff worked!");
          resolve(result);
        } else {
          reject(Error("[query_str4]It broke"));
        }
      });
    });
    promises.push(p4);
  }

  // if(amenity_ids_to_del.length > 0){
  if(req.body.paidExtrasToDel !== undefined){
    var query_str5 = `
    DELETE FROM PlaceExtraAmenity
    WHERE
    `;
    // place_id = ? AND name = ? AND cost = ?
    var s = [];
    for(var i = 0; i < req.body.paidExtrasToDel.length; i++){
      s.push(`(place_id = ${parseInt(place_id)} AND name = '${req.body.paidExtrasToDel[i].name}' AND cost = ${req.body.paidExtrasToDel[i].cost})`);
    }
    s = s.join(' OR ');
    console.log(s);
    query_str5 += s;

    // let vals5 = [];
    // if(amenity_ids_to_del !== undefined){
    //   console.log(amenity_ids_to_del);
    //   for(var i = 0; i < amenity_ids_to_del.length; i++){
    //     if(amenity_ids_to_del[i] != undefined  && amenity_ids_to_del[i] != "undefined"){
    //       vals5.push([parseInt(place_id), parseInt(amenity_ids_to_del[i])]);
    //     }
    //   }
    // }
    // query_str5 = mysql.format(query_str5, [parseInt(place_id), amenity_ids_to_del]);
    console.log('------==');
    console.log(query_str5);
    console.log('------==');
    var p5 = new Promise(function(resolve, reject) {
      conn.query(query_str5, function(err, result){
        if (!err) {
          // resolve("[query_str4]Stuff worked!");
          resolve(result);
        } else {
          reject(Error("[query_str5]It broke"));
        }
      });
    });
    promises.push(p5);
  }

  if(req.body.paidExtrasToAdd !== undefined){
    console.log(req.body.paidExtrasToAdd);
    var query_str6 = `
    INSERT INTO PlaceExtraAmenity (place_id, name, cost)
    VALUES
    `;

    var s = [];
    for(var i = 0; i < req.body.paidExtrasToAdd.length; i++){
      s.push(`(place_id = ${parseInt(place_id)}, name = '${req.body.paidExtrasToAdd[i].name}', cost = ${req.body.paidExtrasToAdd[i].cost})`);
    }
    s = s.join(', ');
    console.log(s);
    query_str6 += s;
    // let vals5 = [];
    // if(amenity_ids_to_del !== undefined){
    //   console.log(amenity_ids_to_del);
    //   for(var i = 0; i < amenity_ids_to_del.length; i++){
    //     if(amenity_ids_to_del[i] != undefined  && amenity_ids_to_del[i] != "undefined"){
    //       vals5.push([parseInt(place_id), parseInt(amenity_ids_to_del[i])]);
    //     }
    //   }
    // }
    // query_str6 = mysql.format(query_str6, [parseInt(place_id), amenity_ids_to_del]);
    console.log('------==');
    console.log(query_str6);
    console.log('------==');
    var p6 = new Promise(function(resolve, reject) {
      conn.query(query_str6, function(err, result){
        if (!err) {
          // resolve("[query_str4]Stuff worked!");
          resolve(result);
        } else {
          reject(Error("[query_str6]It broke"));
        }
      });
    });
    promises.push(p6);
  }





  // Promise.all([p1, p2, p3, p4]).then(values => {
  // Promise.all([p1, p2, p3]).then(values => {
  // Promise.all([p1, p2]).then(values => {
  Promise.all(promises).then(values => {
  	console.log('success');
  	console.log(values);
  	res.json({ 'success': true, 'response': values });
  }, reason => {
  	console.log('failed');
  	console.log(reason);
  	res.json({ 'success': false });
  });
  // res.json({ 'success': false });

}
