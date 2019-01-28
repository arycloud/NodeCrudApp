
var express=require("express");
var app=express();
var bodyparser=require("body-parser");
app.use(bodyparser());

const mysql = require('mysql');

var config =
{
    host: 'localhost',
    user: 'allahbuksh@saqibrasool',
    password: 'gtroad_2017',
    database: 'testMySql',
    port: 3306,
    ssl: true
};
var conn;
function connection(config){
	conn = new mysql.createConnection(config);

	conn.connect(
		function (err) { 
		if (err) { 
			console.log("!!! Cannot connect !!! Error:");
			// throw err;
		}
		else
		{
		   console.log("Connection established.");
		   //conn.query('CREATE DATABASE testMySql;');
		}   
	});
}

app.post("/user/:id",function(req,res){
	var name = req.body.Name;
	var email = req.body.Email;
	connection(config);
	queryDatabase(name, email); 
	res.send("user has been created");
	console.log("user has been created");
});
  
 app.get("/user/:id",function(req,res){  
	var id = req.params.id;
	connection(config);
	readData(id);
	res.send("Data Showed in Console");
});

app.get("/user",function(req,res){
	connection(config);
	   conn.query('SELECT * FROM user', 
		function (err, results, fields) {
			if (err) 
			console.log(err);
			else console.log('Selected ' + results.length + ' row(s).');
			for (i = 0; i < results.length; i++) {
				console.log('Row: ' + JSON.stringify(results[i]));
			}
			console.log('Done.');
		})
   conn.end(
	   function (err) { 
			if (err) throw err;
			else  console.log('Closing connection.') 
	});
	res.send("Data Showed in Console");	
});
 
app.put("/user/:id",function(req,res){
	var name = req.body.Name;
	var email = req.body.Email;
	var id = req.params.id;
	console.log(id+" "+name+" "+email);
	connection(config);
	updateData(id, name, email);
	res.send("Data is Updated");
});

app.delete("/user/:id",function(res,req){
	var id = req.params.id;
	console.log(id);
	//connection(config);
	//deleteData(id);
	//res.send("Data Deleted");
 });
 
app.listen("3000");
console.log ("Server is alive at 3000");

function queryDatabase(name, email){
	console.log(name+" "+email);
       /*conn.query('DROP TABLE IF EXISTS user;', function (err, results, fields) { 
            if (err) throw err; 
            console.log('Dropped user table if existed.');
        })
       conn.query('CREATE TABLE user (id serial PRIMARY KEY, name VARCHAR(50), email VARCHAR(50));', 
            function (err, results, fields) {
                if (err) throw err;
            console.log('Created User table.');
        })*/
       conn.query('INSERT INTO user (name, email) VALUES (?, ?);', [name, email], 
            function (err, results, fields) {
                if (err) throw err;
            else console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
       conn.end(function (err) { 
        if (err) throw err;
        else  console.log('Done.') 
        });
};

function readData(id){
	console.log(id);
	conn.query('SELECT * FROM user WHERE id = '+id, 
		function (err, results, fields) {
			if (err) throw err;
			else console.log('Selected ' + results.length + ' row(s).');
			for (i = 0; i < results.length; i++) {
				console.log('Row: ' + JSON.stringify(results[i]));
			}
			console.log('Done.');
		})
   conn.end(
	   function (err) { 
			if (err) throw err;
			else  console.log('Closing connection.') 
	});
};

function updateData(id, name, email){
       conn.query('UPDATE user SET name = "'+name+'", email = "'+email+'" WHERE id = "'+id+'"', 
            function (err, results, fields) {
                if (err) throw err;
                else console.log('Updated ' + results.affectedRows + ' row(s).');
        })
       conn.end(
           function (err) { 
                if (err) throw err;
                else  console.log('Done.') 
        });
};

function deleteData(id){
       conn.query('DELETE FROM user WHERE id = ?', [id], 
            function (err, results, fields) {
                if (err) throw err;
                else console.log('Deleted ' + results.affectedRows + ' row(s).');
        })
       conn.end(
           function (err) { 
                if (err) throw err;
                else  console.log('Done.') 
        });
};