'use strict';

var express = require('express');
var http = require('http');
var APIMergeDebitoor = require('api-call-merger'); 
var app = express();

// Set Up My Module

function functionToCheckUsersTrustworthy(ip, callback) {
	// This function runs before api call if set an secure option with 'setSecureOptions' function
	// Here possible to add some logic.
	// The main goal of this function is to check if user's IP in blacklist and/or realize a Rate Limiter for User's IP or something else before API call
	// This is async function and perfect fit for Redis
	// console.log('functionToCheckUsersTrustworthy called with IP = ', ip);

	// true - continue
	// false - break
	callback(true);
}

var API = new APIMergeDebitoor( );
API.setMainAPIUrl('/api/resources');
API.attachHttpObject(http);

API.setMaxUrlParams(100);	// Optional
API.setSecureOptions(true, functionToCheckUsersTrustworthy);	// Optional

// Add Routes

API.addAPIRoute('api/users', 		'http://st1.craziegames.com:3000/api/users', 	 	true);
API.addAPIRoute('api/users/', 		'http://st1.craziegames.com:3000/api/users/', 	 	false);

API.addAPIRoute('api/customers', 	'http://st1.craziegames.com:3000/api/customers', 	true);
API.addAPIRoute('api/customers/', 	'http://st1.craziegames.com:3000/api/customers/', 	false);

API.addAPIRoute('api/countries', 	'http://st1.craziegames.com:3000/api/countries', 	true);
API.addAPIRoute('api/countries/', 	'http://st1.craziegames.com:3000/api/countries/', 	false);

app.get('/api/resources', function (req, res) {
	var requestUrl = req.url;
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	API.safeApiRequest(requestUrl, function(data) {
		res.send(data);
	}, ip);
})
 
app.listen(3001);

