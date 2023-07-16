## Dependecies and Libraries
* NodeJs:- [NodeJs](https://www.geeksforgeeks.org/introduction-to-node-js/) for backend
* dotenv:- For handling configuration data. It loads environment variables from a .env file into process.env
* ExpressJS:- [ExpressJS](https://www.geeksforgeeks.org/introduction-to-express/) for Handling routes.
* jsonwebtoken:- generate access tokens for client-side authorisation. The server geneerates tken and issue it to the client allowing routing/service access
* nodemon:- auto restart node app when file changes are detected in dir
* cors :- allow restricted resource access from external domains
* bcryptjs :- for password hashing
* @hapi/joi :- for input verification e.g. data type, string length etc
## How to Run Appplication
### Install NodeJs and confirm its version
```bash
node -v
```
```bash
npm -v
```
### Initialize npm
```bash
npm init -y
```
### Install required libraries
```bash
npm i express mongoose bcryptjs dotenv cors jsonwebtoken @hapi/joi --save
```
### Check version of installed modules
```bash
npm --version express
npm --version mongooe
npm --version jsonwebtoken
npm --version bcryptjs
npm --version cors
npm --version @hapi/joi 
```
### Setup MongoDB Atlas
* [Create MongoDb Atlas free tier account](https://www.mongodb.com/cloud/atlas/register)
* Login to the account
* [Create New Cluster](https://cloud.mongodb.com/v2/64b04a7dce9502136d7db45d#/clusters/edit?from=ctaClusterHeader) and select M0 Sandbox free cluster tier
* Click connect, add IP address, choose all access from anywhere, db username & password (store them for future connection)
* Connect to you application using Drivers connection option
    * Select latest driver version
    * Install the driver 
    ```bash
    npm install mongodb
    ```
    * Add your connection string/db url to the .env in your application code, replacing __password__ with user's password and __dbname__ with preferred db name
    ```bash
    DB_URL=mongodb+srv://danotieno:<password>@cluster0.ooljlsh.mongodb.net/my_mongodb?retryWrites=true&w=majority
    ```
### Globally install Nodemon dependecy from vscode terminal to autorestart your server
```bash
npm install -g nodemon
```
### Run the application
```bash
nodemon index.js
```
### Open browser and run the following 
```bash
http://localhost:5001/
```
This will return __Hey your NodeJs is working !!__

### Register users on Postman using POST Request
* URL
```bash
http://localhost:5001/api/users/register
```
* Body -->raw -->JSON
```bash
 {
    "first_name": "Daniel",
    "last_name": "Otieno",
    "email":"danotieno993@gmail.com",
    "password":"2Sg846r9AbPBnjw9"
 }
```
### Reference
* [NodeJs Authentication With JWT Tutoria Working Well](https://medium.com/swlh/nodejs-with-jwt-authentication-feb961763541)
* [NodeJs Authentication With JWT Source Code Working Well](https://github.com/shelcia/authentication-jwt)
* [JWT Authentication with Node.js](https://www.geeksforgeeks.org/jwt-authentication-with-node-js/)