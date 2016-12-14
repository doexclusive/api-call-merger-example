The goal of this project is to demonstrate the NPM module api-call-merger ( https://www.npmjs.com/package/api-call-merger ). On this website you also can read info and how to use this one.

To test module just do few commands: 
1) cd PROJECT_NAME
2) mocha tests.js

This project includes few files:
1) existingAPI.js - this is for emulating exiting API
2) app.js - This is an example of some project that use api-call-merger
3) tests.js - file to run Mocha's test
4) node_modules/api-call-merger/index.js - is module's source

Work of this module you can try yourself:
1) forever run existingAPI.js
2) forever run app.js

or on my website.

Main API url is http://st1.craziegames.com:3001/api/resources?

Allowed APIs are:

	api/users
	api/users/id101
	api/users/id102
	api/users/id103

	api/customers
	api/customers/id301
	api/customers/id302
	api/customers/id303

	api/countries
	api/countries/id401
	api/countries/id402
	api/countries/id403

So the format is :
	http://st1.craziegames.com:3001/api/resources?groupName1=apiName1...groupNameN=apiNameN

Examples:

1) http://st1.craziegames.com:3001/api/resources?users=api/users/id101&customer=api/customers/id301&coutries=api/countries

returns:

	{"users":"{\"id\":\"id101\",\"firstName\":\"Mike\",\"age\":21}","customer":"{\"id\":\"id301\",\"fullName\":\"Bill M.\",\"moneySpent\":10000}","coutries":"[{\"id\":\"id401\",\"countryName\":\"DENMARK\",\"countryCode\":\"DK\"},{\"id\":\"id402\",\"countryName\":\"UKRAINE\",\"countryCode\":\"UA\"},{\"id\":\"id403\",\"countryName\":\"USA\",\"countryCode\":\"US\"}]"}

2) http://st1.craziegames.com:3001/api/resources?userOne=api/users/id101&userTwo=api/users/id102

returns:

{"userOne":"{\"id\":\"id101\",\"firstName\":\"Mike\",\"age\":21}","userTwo":"{\"id\":\"id102\",\"firstName\":\"Bob\",\"age\":22}"}

3) http://st1.craziegames.com:3001/api/resources?users=api/users&countries=api/countries

returns:

{"users":"[{\"id\":\"id101\",\"firstName\":\"Mike\",\"age\":21},{\"id\":\"id102\",\"firstName\":\"Bob\",\"age\":22},{\"id\":\"id103\",\"firstName\":\"John\",\"age\":23}]","countries":"[{\"id\":\"id401\",\"countryName\":\"DENMARK\",\"countryCode\":\"DK\"},{\"id\":\"id402\",\"countryName\":\"UKRAINE\",\"countryCode\":\"UA\"},{\"id\":\"id403\",\"countryName\":\"USA\",\"countryCode\":\"US\"}]"}


