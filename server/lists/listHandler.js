// require helper, User, List
var helper = require('../config/helpers.js');
var User = require('../users/userModel.js');
var List = require('./listModel.js');

// export function
module.exports = {

  // TODO:
  // Coordinate with front end on what data
  // should be sent and received.

  // addList method
  addList: function(req, res){
    var newListObj = req.body;

    List.create(newListObj, function(err, list){
      if (err) { // notifies if error is thrown
        console.log("mongo create list err: ", err);
        helper.sendError(err, req, res);
      } else { // list created, sends 201 status
        //res.status(201);
        res.json(list);
      }
    });
  },

  // getLists method
  getLists: function(req, res){
    // var userid = req.body.userid;

    // temporarily passing through url
    var userid = req.params.id

    List.find({'creator_id': userid})
      .then(function(lists){
        res.json(lists);
      });
  },

  // getAllLists method
  getAllLists: function(req, res){
    List.find({})
      .then(function(lists){ // returns array of lists
        res.json(lists);
      });
  },

  // getJobs method
  getJobs: function(req, res){
    var userid = req.body.userid;

    List.find({'deliverer_id': userid})
      .then(function(lists){
        res.json(lists);
      });
  },

  // updateJobStatus method (corrected version)
  updateJobStatus: function(req, res){
    // TODO: Fill Out
  },

  // updateStatus method
  updateStatus: function(req, res){
    var listid = req.body.listid;
    var userid = req.body.userid;

    List.findOne({'_id': listid}, function(err, list){
      if (err) { // notifies if error is thrown
        console.log("mongo findOne list err: ", err);
      } else {
        if (!list) { // notifies if list is not found
          helper.sendError("List not found", req, res);
        } else {
          List.update({'_id': listid}, {'deliverer_id': userid}, function(err, result){
            if (err) { // notifies if error is thrown
              console.log("mongo update err: ", err);
            } else { // update successful, returns result
              res.json(result);
            }
          });
        }
      }
    });
  }

};