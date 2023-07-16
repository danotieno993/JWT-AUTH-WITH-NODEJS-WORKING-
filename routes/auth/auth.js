//Creating Signup

//import required modules
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//validation of user inputs prerequisites
const Joi = require("@hapi/joi");
const registerSchema = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//signup a user
router.post("/register", async (req, res) => {
  //checking if user email already exists & return result
  const emailExist = await User.findOne({ email: req.body.email }); 
  if (emailExist) {
    res.status(400).send("Email already exists");
    return;
  }

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  //adding new user
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    //validation of user inputs
    const { error } = await registerSchema.validateAsync(req.body);
  //we can just get the error(if exists) with object deconstruction
    //  if error exists then send back the error
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    } 

    else {
      //new user is added
      const saveUser = await user.save();
      res.status(200).send("user created");
    }

  } 
  catch (error) {
    res.status(500).send(error);
  }
});

//Create user login
const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//login user
router.post("/login", async (req, res) => {

  //check if user email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect Email- ID");

  //Check if password matches
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");

  try {

    //Validation of user inputs
    const { error } = await loginSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);

//     else {
//       //Test successfull user login
//       res.send("User successfully logged in");
//       // res.send("Successful login for user", {email});
//     }
//   } 
//   catch (error) {
//     res.status(500).send(error);
//   }
// });
// module.exports = router;

      //Send back JWT Token instead
    else {
      //Sending back the token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).send(token);
    }
  } 
  catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;