// require jwt, helper, User, List
var jwt = require('jwt-simple');
var helper = require('../config/helpers.js');
var User = require('./userModel.js');

// export function
module.exports = {

  // TODO:
  // Coordinate with front end on what data
  // should be sent and received.

  // signin method
  signin: function(req, res){
    var email = req.body.email;
    var password = req.body.password;

    // NOTE: This does a direct check for username and email.
    // TODO:
    // Setup password encryption in user model.
    // Update controller to use comparePasswords method of model
    User.findOne({'email': email, 'password': password}, function(err, user){
      if (err) { // notifies if error is thrown
        console.log("mongo findOne signin err: ", err);
        helper.sendError(err, req, res);
      } else {
        if (!user) { // notifies if user is not found
          helper.sendError("No user found", req, res);
        } else { // signin success, assigns jwt session token
          var token = jwt.encode(user, 'secret');
          res.json({
            token: token, //session token will be set on client side
            userid: user['_id']
            // anything else to send back on success?
          });
        }
      }
    });
  },

  // signup method
  signup: function(req, res){
    var email = req.body.email;
    var newUserObj = req.body

    User.findOne({'email': email}, function(err, user){
      if (err) { // notifies if error is thrown
        console.log("mongo findOne signup err: ", err);
        helper.sendError(err, req, res);
      } else {
        if (user) { // notifies if email is already taken
          helper.sendError("Email already taken", req, res);
        } else {
          User.create(newUserObj, function(err, user){
            if (err) { // notifies if error is thrown
              console.log("mongo create user err: ", err);
              helper.sendError(err, req, res);
            } else { // signup success, assigns jwt session token
              var token = jwt.encode(user, 'secret');
              res.json({
                token: token, //session token will be set on client side
                userid: user['id']
                // anything else to send back on success?
              });
            }
          });
        }
      }
    });
  }

};