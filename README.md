# About
The goal of this project is to demonstrate the NPM module api-call-merger ( https://www.npmjs.com/package/api-call-merger ). Please read full description on npmjs.org
# Tests
The best way to test module is using Mocha. Install it as global package and
```sh
cd PROJECT_NAME
mocha tests.js
```
# File structure
This project includes few files:
- **existingAPI.js** - this is for emulating exiting API
- **app.js** - This is an example of some project that use api-call-merger
- **tests.js** - file to run Mocha's test
- **node_modules/api-call-merger/index.js** - is module's source

# Check 
On your computer:
```sh
cd PROJECT_NAME
forever start existingAPI.js
forever start app.js
```
Or on my website.
Main API url is http://st1.craziegames.com:3001/api/resources?
Allowed APIs are:
```
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
```
So the format is :
	http://st1.craziegames.com:3001/api/resources?groupName1=apiName1...groupNameN=apiNameN

# More Examples
### One
Call 
http://st1.craziegames.com:3001/api/resources?users=api/users/id101&customer=api/customers/id301&coutries=api/countries
You'll get
```json
{"users":"{\"id\":\"id101\",\"firstName\":\"Mike\",\"age\":21}","customer":"{\"id\":\"id301\",\"fullName\":\"Bill M.\",\"moneySpent\":10000}","coutries":"[{\"id\":\"id401\",\"countryName\":\"DENMARK\",\"countryCode\":\"DK\"},{\"id\":\"id402\",\"countryName\":\"UKRAINE\",\"countryCode\":\"UA\"},{\"id\":\"id403\",\"countryName\":\"USA\",\"countryCode\":\"US\"}]"}
```
### Two
Call
http://st1.craziegames.com:3001/api/resources?userOne=api/users/id101&userTwo=api/users/id102
You'll get
```json
{"userOne":"{\"id\":\"id101\",\"firstName\":\"Mike\",\"age\":21}","userTwo":"{\"id\":\"id102\",\"firstName\":\"Bob\",\"age\":22}"}
```
### Three
Call
http://st1.craziegames.com:3001/api/resources?users=api/users&countries=api/countries
You'll get
```json
{"users":"[{\"id\":\"id101\",\"firstName\":\"Mike\",\"age\":21},{\"id\":\"id102\",\"firstName\":\"Bob\",\"age\":22},{\"id\":\"id103\",\"firstName\":\"John\",\"age\":23}]","countries":"[{\"id\":\"id401\",\"countryName\":\"DENMARK\",\"countryCode\":\"DK\"},{\"id\":\"id402\",\"countryName\":\"UKRAINE\",\"countryCode\":\"UA\"},{\"id\":\"id403\",\"countryName\":\"USA\",\"countryCode\":\"US\"}]"}
