const { json } = require("express/lib/response");
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config');
const User = require("../models/user");
const auth = require('../middleware/auth');

// JWT TOKEN DATA
const SECRET_KEY = config.get('jwtSecret')
const expiresIn = config.get('expiresIn')

// Create a token from a payload 
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

module.exports.createUser = function (req, res) {
  User.findOne({ Email: req.body.Email }, function (err, user) {
    if (err) {
      console.log("error");
      return res.status(401).json({
        message: err,status:401
      });
    }

    if (!user) {
      // If User Not found Create User
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          newPassword = hash;
          let profile=req.body.profile;
          let name=req.body.name;
          let email=req.body.Email;
          const token = createToken({ email,name,profile })
          console.log("Access Token:" + token);
          User.create(
            {
              Email: email,
              password: newPassword,
              profile: profile,
              name: name,
            },
            function (err, user) {
              if (err) {
                return res.status(401).json({
                  message: err,status:401
                });
              }
              return res.status(200).json({
                token:token,
                Messaging: "User created",
                userDetails: user,
              });
            }
          );
        });
      });

    } else {
      return res.status(400).json({ message: 'User Already Exits' });
    }
  });
};

module.exports.createSession = function (req, res) {
  //find the user
  console.log("Request::", req)
  User.findOne({ Email: req.body.Email }, function (err, user=null) {
    console.log(user.Email);
    if (err) {
      console.log("Error finding user while signing in");
      return;
    }
    // handle user found
    if (user.Email) {
      let email=user.Email;
      let profile=user.profile;
      let name=user.name;
      bcrypt.compare(req.body.password, user.password)
      .then(isMatch => {
        // Return Error as Response if password didn't match
        if (!isMatch) return res.status(400).json({ message: "Server: Invalid Credential",status:400 });
        // Creating JWT token using user (id & email)
        const token = createToken({ name,profile,email })
        return res.status(200).json({
          token,
          Messaging: "Session created",
          userDetails: user,
        });
        
      })
    } else {
      return res.status(400).json({
        message: "User not found",status:400,
      });
    }
  });
};

module.exports.loggedUser = function (req, res) {
  console.log("params is", req.user);
  // User.findById(req.body.id, function (err, user) {
  User.findOne({Email: new RegExp('^'+req.user.email+'$', "i")}, function (err, user) {
    if (err) {
      return res.status(400).json({
        message: "Server: User Not Exits[Authentication Index]",
      });
    }
    if(user){
      console.log("user found", user);
      return res.status(200).json({
        Messaging: "User signed",
        userDetails: user,
      });
    }else{
      return res.status(400).json({
        message: "User not found",status:400,
      });
    }
  });
};
