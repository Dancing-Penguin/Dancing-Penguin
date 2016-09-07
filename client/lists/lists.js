angular.module("crowdcart.lists", [])

.controller("ListsController", function ($scope, Lists, $window) {
  // Your code here

  $scope.data = {};

  $scope.userid = $window.localStorage.getItem('crowdcartuser')

  var initialize = function () {
    console.log('userId: ',$scope.userid)
    Lists.getLists($scope.userid)
      .then(function (lists) {
        $scope.data.lists = lists;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  //TODO add new list method, will be attached into createnewlist.html

  $scope.addList = function () {
  //   $scope.list.creator_id =
  //   Lists.newList($scope.list)
  //     .then(function () {
  //       $location.path('/mylists');
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  };

  initialize();

});

// .controller(ListsController, function($scope) {

//   //TODO: What methods do we need?

// })
