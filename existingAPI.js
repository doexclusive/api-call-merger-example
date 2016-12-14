 var data = {
 	users : [
 		{ id : 'id101', firstName : 'Mike', age : 21 },
 		{ id : 'id102', firstName : 'Bob',  age : 22 },
 		{ id : 'id103', firstName : 'John', age : 23 }
 	],

 	customers : [
 		{ id : 'id301', fullName : 'Bill M.',  moneySpent : 10000 },
 		{ id : 'id302', fullName : 'Luke Z.',  moneySpent : 20000 },
 		{ id : 'id303', fullName : 'Rob P.',   moneySpent : 30000 }
 	],

 	countries : [
 		{ id : 'id401', countryName : 'DENMARK',  countryCode : 'DK' },
 		{ id : 'id402', countryName : 'UKRAINE',  countryCode : 'UA' },
 		{ id : 'id403', countryName : 'USA',	  countryCode : 'US' }
 	]

};


var express = require('express');
var app = express();


// *******************************************************************************************
// 		THIS IS JUST EXAMPLE OF EXISTING API PROVIDED IN THE DESCRIPTION OF TASK. JUST FOR TESTS
// 		Has a timeouts to emulate request to DB and do not optimized and 
// 		with a lot of security issues and without other setting except few routes
// *******************************************************************************************



app.get('/api/:apiId', function (req, res) {
	setTimeout( function() {
		res.send(data[req.params.apiId]);
	}, Math.floor((Math.random() * 1000) + 100) );
});

app.get('/api/:apiId/:id', function (req, res) {
	// Try to find data
	for ( var i = 0; i < data[req.params.apiId].length; i++) {
		if ( data[req.params.apiId][i].id == req.params.id ) {
			setTimeout( function() {
				res.send(data[req.params.apiId][i]);
			}, Math.floor((Math.random() * 1000) + 100) );
			return;
		}
	}
	// Did not found data
	setTimeout( function() {
		res.send({id:req.params.id, error : 1});
	}, Math.floor((Math.random() * 1000) + 100) );
});

app.listen(3000);