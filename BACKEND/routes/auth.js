const express = require("express"); //for crud aplication
const User = require("../models/User"); //import model of user
const {body, validationResult} = require("express-validator"); //npm module for validation
const routes = express.Router();
const bcrypt = require("bcryptjs"); //npm module for password hashing
var jwt = require("jsonwebtoken"); //npm module for token
const JWT_SECRET = "mohit@123";
const fatchuser = require("../Middleware/fetchuser");

//making post request for sending data to database
//route:1 creating the user post request on /api/createuser
routes.post(
  //endpoint
  "/createuser",
  //validation for name,email,password
  [
    body("name", "name more then 3 charctor").isLength({min: 3}),
    body("email", "enter valid email").isEmail(),
    body("password", "password must be 8 charector long").isLength({min: 8}),
  ],
  async (req, res) => {
    //if any error acure in validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    try {
      //check the given email is allready exist or note if it is in database the this  throw error
      let user = await User.findOne({email: req.body.email});
      if (user) {
        return res
          .status(400)
          .json({error: "sorry this email was allrady ragitered"});
      }
      //for password hashing
      //first genrate salt and then hash the password with salt
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      //store data that from request massage
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtDATA = jwt.sign(data, JWT_SECRET);
      res.json(jwtDATA);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
//Autenticat the user with their email and password
//route:2 login the user post request on /api/login :no login required
routes.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "password must be 8 charector long").isLength({min: 8}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({error: "email allready exist"});
      }
      const matchpassword = await bcrypt.compare(password, user.password);
      if (!matchpassword) {
        return res.status(400).json({error: "worng password"});
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtDATA = jwt.sign(data, JWT_SECRET);
      res.json(jwtDATA);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error!");
    }
  }
);
// route:1 get data of loged user post request on /api/login :no login required
//get user data
routes.post("/getuser", fatchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
});
module.exports = routes;
