const { json } = require("express/lib/response");
const User = require("../models/user");
module.exports.createUser = function (req, res) {
  console.log(req.body.Email, "adcd");
  // let body = JSON.parse(req.body);

  User.findOne({ Email: req.body.Email }, function (err, user) {
    if (err) {
      console.log("erro");

      return res.status(500).json({
        message: "error1",
      });
    }

    console.log("user");
    if (!user) {
      User.create(
        {
          Email: req.body.Email,
          password: req.body.password,
          profile: req.body.profile,
          name: req.body.name,
        },
        function (err, user) {
          if (err) {
            console.log("erro");

            return res.status(500).json({
              message: "error",
            });
          }
          return res.status(200).json({
            Messaging: "User created",
            User: user,
          });
        }
      );
    } else {
      return res.status(200).json({
        Messaging: "User already present",
        User: user,
      });
    }
  });
};

module.exports.createSession = function (req, res) {
  //find the user
  User.findOne({ Email: req.body.Email }, function (err, user) {
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
