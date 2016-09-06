// services go here

angular.module("crowdcart.services",[])

.factory("Auth", function($http, $location, $window) {

  // signin
  var signin = function(user) {
    return $http({
      method: "POST",
      url: "/api/signin",
      // clarify on data format
      data: user
    })
    .then(function(res) {
      return res.data.token
    })
  }

  // signup
  var signup = function(user) {
    return $http({
      method: "POST",
      url: "/api/signup",
      // clarify on data format
      data: user
    })
    .then(function(res) {
      return res.data.token
    })
  }

  var isAuthenticated = function () {
    // check local to see if token exists
    // going by name crowdcarttoken for time being
    return !!$window.localStorage.getItem("crowdcarttoken")
  }

  var signout = function () {
    $window.localStorage.removeItem("crowdcarttoken");
    $location.path("/signin")
  }


})

.factory("Lists", function($http) {

  // get all lists for specific user; since with routing to decide if that's the right meaning
  var getLists = function (id) {
    return $http({
      method: "GET",
      url: "/api/lists",
      data: id
    })
    .then(function (res) {
      return res.data
    })
  }

  //get all lists in system
  var getAllList = function() {
    return $http({
      method: "GET",
      url: "/api/crowd"
    })
  }

  // posting a new lists
  var newList = function (list) {
    return $http({
      method: "POST",
      url: "/api/lists",
      data: list
    });
  }

  // added because server route looks to handle, not sure if we will need it
  var updateStatus = function (listId, status) {
    return $http({
      method: "POST",
      url: "api/status",
      // need to decide on format for this call
      data: listId, status
    })
  }

  // not mvp; for editing lists later
  var updateList = function (list) {
    return $http({
      method: "PUT",
      url: "/api/lists",
      data: list
    })
  }

  // maybe mvp
  var deleteList = function (list) {
    return $http({
      method: "DELETE",
      url: "/api/lists",
      data: list /*id*/
    })
  }

  return {
    getLists: getLists,
    getAllList: getAllList,
    newList: newList,
    updateStatus: updateStatus,
    newList: newList,
    updateList: updateList
  }

})