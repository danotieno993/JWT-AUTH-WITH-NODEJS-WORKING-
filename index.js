
// Create server by importing express module and listen to it
const express = require("express");
const app = express();
const dotenv = require("dotenv"); 
dotenv.config(); //accessing the environment variables
const { API_PORT } = process.env;
const port = process.env.API_PORT || API_PORT;

app.get("/", (req, res) => {
  res.send(`Hey your NodeJs is working well !!`);
});
app.listen(port, () => {
  console.log(`server is up and running on port  ${port}`);
});

const mongoose = require("mongoose");
const cors = require("cors");

//Import auth routes
const authRoute = require("./routes/auth/auth");
const authDashboard = require("./routes/auth/authDashboard");

//Connecting to db
(async (req, res) => {
    try {
      await mongoose.connect(process.env.DB_URL)
      console.log('Successfully connected to my mongo db')
    } 
    catch (err) {
      console.log('error: Not connect'+ err)
    } 
  })()

//middleware -> disalbing cors and used for json output
app.use(express.json(), cors());

//route middleware
app.use("/api/users", authRoute);
app.use("/api/dashboard", authDashboard);
// app.use("/api/users", auth);