const { json } = require("express/lib/response");
const bcrypt=require('bcryptjs');
const User = require("../models/user");


module.exports.createUser = function (req, res) {
  console.log(req.body.Email, "adcd");
  // let body = JSON.parse(req.body);

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
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          newPassword = hash;
          const token = createToken({ id, email })
          console.log("Access Token:" + token);
          User.create(
            {
              Email: req.body.Email,
              password: newPassword,
              profile: req.body.profile,
              name: req.body.name,
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
                User: user,
              });
            }
          );
          
          
          
          res.status(200).json({
            token,
            user: {
              _id: last_item_id + 1,
              fname: fname,
              lname: lname,
              email: email,
              password: newPassword,
              img: img,
              date: date,
              city: city,
              state: state,
              country: country,
              postal: postal,
              ip: ip
            }
          })
        });
      });
      User.create(
        {
          Email: req.body.Email,
          password: req.body.password,
          profile: req.body.profile,
          name: req.body.name,
        },
        function (err, user) {
          if (err) {
            return res.status(401).json({
              message: err,status:401
            });
          }
          return res.status(200).json({
            Messaging: "User created",
            User: user,
          });
        }
      );
    } else {
      return res.status(400).json({ msg: 'User Already Exits' });
    }
  });
};

module.exports.createSession = function (req, res) {
  //find the user
  console.log("Request::", req)
  User.findOne({ Email: req.body.email }, function (err, user) {
    // console.log();
    if (err) {
      console.log("Error finding user while signing in");
      return;
    }
    // handle user found
    if (user) {
      //handle password which doesn't match
      if (user.password != req.body.password) {
        return res.json({
          Error: "Password not matched",
        });
      }
      //handle session creation
      // res.cookie('user-id',user.id);
      return res.json({
        Profile: user,
        tokens: user.id,
        message: "session created",
      });
    } else {
      return res.json({
        message: "usre not found",
      });
    }
  });
};
module.exports.loggedUser = function (req, res) {
  console.log("params is", req.body);
  User.findById(req.body.id, function (err, user) {
    if (err) {
      return res.status(500).json({
        message: "error",
      });
    }
    console.log("user found", user);
    return res.status(200).json({
      Messaging: "User signed",
      user: user,
    });
  });
};
