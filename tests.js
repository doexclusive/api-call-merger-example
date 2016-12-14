var assert = require('assert');
var APIMergeDebitoor = require('api-call-merger'); // this is my module

describe('API Merge for Debitoor', function() {

		describe('function attachHttpObject', function() {

			it('should return same string(or object) as we send to function ', function() {
				var testString = "Yes, it works!";
				var API = new APIMergeDebitoor();
				API.attachHttpObject(testString);
				assert.equal(testString, API.data.httpReq );
			});

		});

		describe('function safeApiRequest', function() {

			it('should return "Please Try Again Later" if useSecureFunction is true, but secureFunction is not defined ', function(done) {
				var API = new APIMergeDebitoor();
				API.setSecureOptions(true, undefined );
				API.safeApiRequest('/api/resources?users=api/users/id101', function(data) {
					assert.equal(data, "Please Try Again Later");
					done();
				}, '44.12.0.7');
			});

			it('should return "Please Try Again Later" if useSecureFunction is true, secureFunction defined but IP not provided', function(done) {
				var API = new APIMergeDebitoor();
				API.setSecureOptions(true, function(callback) { callback(true);});
				API.safeApiRequest('/api/resources?users=api/users/id101', function(data) {
					assert.equal(data, "Please Try Again Later");
					done();
				});
			});

			it('should return "Please Try Again Later" if useSecureFunction is true, IP provided, but restricted', function(done) {
				var API = new APIMergeDebitoor();
				API.setSecureOptions(true, function(callback) { callback(false);});
				API.safeApiRequest('/api/resources?users=api/users/id101', function(data) {
					assert.equal(data, "Please Try Again Later");
					done();
				});
			});

		});

		describe('function apiRequest', function() {

			it('should return "InvalidRequest" if input is not a string', function(done) {
				var API = new APIMergeDebitoor();
				API.safeApiRequest(1775, function(data) {
					assert.equal(data, "InvalidRequest");
					done();
				});
			});

			it('should return "InvalidRequest" if input has an incorrect main part of URL request', function(done) {
				var API = new APIMergeDebitoor();
				API.setMainAPIUrl('/api/resources');
				API.safeApiRequest('/APID/Resources?users=/api/users', function(data) {
					assert.equal(data, "InvalidRequest");
					done();
				});
			});

			it('should return "InvalidRequest" if input does not have sign "?"', function(done) {
				var API = new APIMergeDebitoor();
				API.setMainAPIUrl('/api/resources');
				API.safeApiRequest('/api/resources', function(data) {
					assert.equal(data, "InvalidRequest");
					done();
				});
			});

			it('should return "InvalidRequest" if input does not have url parameters', function(done) {
				var API = new APIMergeDebitoor();
				API.setMainAPIUrl('/api/resources');
				API.safeApiRequest('/api/resources?', function(data) {
					assert.equal(data, "InvalidRequest");
					done();
				});
			});

		});

		describe('function getDataToExecute', function() {

			it('should correct select an URL for different api requests from list of routes', function() {
				var API = new APIMergeDebitoor();
				API.setMainAPIUrl('/api/resources');
				API.setMaxUrlParams(2);
				API.addAPIRoute('api/countries', 'http://st1.craziegames.com:3000/api/countries', true);
				API.addAPIRoute('api/users', 'http://st1.craziegames.com:3000/api/users', true);
				var data = API.getDataToExecute([ '/api/resources', 'countries=api/countries&users=api/users' ]);
				assert.equal( data[0].url === 'http://st1.craziegames.com:3000/api/countries' && data[1].url === 'http://st1.craziegames.com:3000/api/users', true);
			});

			it('should define templates like "api/rabbits" and "api/rabbits/id777"', function() {
				var API = new APIMergeDebitoor();
				API.setMainAPIUrl('/api/resources');
				API.setMaxUrlParams(2);
				API.addAPIRoute('api/rabbits', 'http://st1.craziegames.com:3000/api/rabbits', true);
				API.addAPIRoute('api/rabbits/', 'http://st1.craziegames.com:3000/api/rabbits/', false);
				var data = API.getDataToExecute([ '/api/resources', 'group1=api/rabbits/id777&group2=api/rabbits' ]);
				assert.equal(JSON.stringify(data), '[{"completed":false,"reqId":"rNE0","result":null,"group":"group1","url":"http://st1.craziegames.com:3000/api/rabbits/id777"},{"completed":false,"reqId":"rE1","result":null,"group":"group2","url":"http://st1.craziegames.com:3000/api/rabbits"}]');
			});

			it('should return an array for the execution with a number of elements not exeeding maxUrlParams', function() {
				var API = new APIMergeDebitoor();
				API.setMainAPIUrl('/api/resources');
				API.setMaxUrlParams(2);
				API.addAPIRoute('api/users/', 'http://st1.craziegames.com:3000/api/users/', false);
				var data = API.getDataToExecute([ '/api/resources', 'users=api/users/id101&users2=api/users/id102&users3=api/users/id103' ]);
				assert.equal(JSON.stringify(data), '[{"completed":false,"reqId":"rNE0","result":null,"group":"users","url":"http://st1.craziegames.com:3000/api/users/id101"},{"completed":false,"reqId":"rNE1","result":null,"group":"users2","url":"http://st1.craziegames.com:3000/api/users/id102"}]');
			});


			it('should ignore URL params that dont have routes', function() {
				var API = new APIMergeDebitoor();
				API.setMainAPIUrl('/api/resources');
				API.addAPIRoute('api/users/', 'http://st1.craziegames.com:3000/api/users/', false);
				var data = API.getDataToExecute([ '/api/resources', 'users=api/users/id101&users2=api/rabbits/id102']);
				assert.equal(JSON.stringify(data), '[{"completed":false,"reqId":"rNE0","result":null,"group":"users","url":"http://st1.craziegames.com:3000/api/users/id101"}]');
			});

			it('should ignore duplicated URL params', function() {
				var API = new APIMergeDebitoor();
				API.setMainAPIUrl('/api/resources');
				API.addAPIRoute('api/users/', 'http://st1.craziegames.com:3000/api/users/', false);
				var data = API.getDataToExecute([ '/api/resources', 'users=api/users/id101&users=api/users/id102']);
				assert.equal(JSON.stringify(data), '[{"completed":false,"reqId":"rNE0","result":null,"group":"users","url":"http://st1.craziegames.com:3000/api/users/id101"}]');
			});

			it('should process only params in format key=value', function() {
				var API = new APIMergeDebitoor();
				API.setMainAPIUrl('/api/resources');
				API.addAPIRoute('api/users/', 'http://st1.craziegames.com:3000/api/users/', false);
				var data = API.getDataToExecute([ '/api/resources', 'users2&users3&users=api/users/id101&users5']);
				assert.equal(JSON.stringify(data), '[{"completed":false,"reqId":"rNE2","result":null,"group":"users","url":"http://st1.craziegames.com:3000/api/users/id101"}]');
			});


		});


		describe('function getDataToExecute', function() {

			it('should copy all groups from request and put data to result object', function() {
				var API = new APIMergeDebitoor();
				API.setMainAPIUrl('/api/resources');
				API.addAPIRoute('api/users/', 'http://st1.craziegames.com:3000/api/users/', false);
				API.addAPIRoute('api/countries/', 'http://st1.craziegames.com:3000/api/countries/', false);
				var data = API.parseRequests([{ completed: true, reqId: 'rNE0', result: '{"id":"id101","firstName":"Mike","age":21}', group: 'users', url: 'http://st1.craziegames.com:3000/api/users/id101' }, { completed: true, reqId: 'rNE1', result: '{"id":"id401","countryName":"DENMARK","countryCode":"DK"}', group: 'countries', url: 'http://st1.craziegames.com:3000/api/countries/id401' }]);
				assert.equal(JSON.stringify(data), '{"users":"{\\"id\\":\\"id101\\",\\"firstName\\":\\"Mike\\",\\"age\\":21}","countries":"{\\"id\\":\\"id401\\",\\"countryName\\":\\"DENMARK\\",\\"countryCode\\":\\"DK\\"}"}');
			});

		});

	
});