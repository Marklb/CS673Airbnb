var db = function(app){ 
console.log('Loading db');

var mysql      = require('mysql');
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '9993kuo',
   database : 'airbnb'
});

 
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
    console.log("Error connecting database ... \n\n");  
}
});
 
app.get("/fortest",function(req,res){
connection.query('SELECT * from Users LIMIT 2', function(err, rows, fields) {
connection.end();
  if (!err)
  {
//	var test = JSON.parse(rows);
	res.json(rows);
  }

  else
	console.log('Error while performing Query.');
  });
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