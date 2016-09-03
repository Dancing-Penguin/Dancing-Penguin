// require userHandler, listHandler
var userHandler = require('../users/userHandler.js');
var listHandler = require('../lists/listHandler.js');

// export function
module.exports = function(app, express){

  // TODO:  Coordinate with frontend on
  //        the request url names ('/api/...')

  // POST - signin
  app.post('/api/signin', userHandler.signin);
  // POST - signup
  app.post('/api/signup', userHandler.signup);

  // POST - addList
  app.post('/api/list', listHandler.addList);
  // GET - getList
  app.get('/api/list', listHandler.getList);
  // GET - getAllLists
  app.get('/api/crowd', listHandler.getAllLists);
  // POST - updateStatus (reflects when jobs/lists are assigned)
  app.post('/api/status', listHandler.updateStatus);

  // Will probably need more routes over time

};