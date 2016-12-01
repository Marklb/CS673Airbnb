var mysql      = require('mysql');

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
        (SELECT COUNT(*)
        FROM Reservation AS R1
        WHERE 
            P.place_id = R1.place_id
          AND
            ((R1.date_range_start BETWEEN ? /* date_start */ AND ? /* date_end */)
              OR
            (R1.date_range_end BETWEEN ? /* date_start */ AND ? /* date_end */))) <= 0
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