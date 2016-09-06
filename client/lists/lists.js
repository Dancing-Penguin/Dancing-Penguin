angular.module("crowdcart.lists", [])

.controller("ListsController", function ($scope, Lists, $window) {
  // Your code here

  $scope.data = {};

  $scope.username = $window.localStorage.getItem('crowdcartuser')

  var initialize = function () {
    console.log($scope)
    Lists.getLists()
      .then(function (lists) {
        $scope.data.lists = lists;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  initialize();

});

// .controller(ListsController, function($scope) {

//   //TODO: What methods do we need?
  
// })
