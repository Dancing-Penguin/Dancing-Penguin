angular.module("crowdcart.lists", [])

.controller("ListsController", function ($scope, Lists, $window, $location) {
  // Your code here
  $scope.data = {};

  $scope.list = {};
  $scope.list.delivery_address = {};
  $scope.list.items = [];

  $scope.userid = $window.localStorage.getItem('crowdcartuser');

  var initialize = function () {
    console.log('userId: ',$scope.userid)

    Lists.getLists($scope.userid)
      .then(function (lists) {
        $scope.data.lists = lists;
      })
      .catch(function (error) {
        console.error(error);
      });

    Lists.getAllList()
      .then(function(allLists){
        $scope.data.allLists = allLists;
        console.log('ALL LISTS: ', allLists);
      })
      .catch(function(error){
        console.error(error);
      });
  };

  //TODO add new list method, will be attached into createnewlist.html

  $scope.addList = function () {
    $scope.list.creator_id = $scope.userid;
    console.log('list', $scope.list);
    Lists.newList($scope.list)
      .then(function () {
        console.log('rediction');
        $location.path('/mylists.html');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.addJob = function(list) {
    list.deliverer_id = $scope.userid;
  }

  initialize();

});

// .controller(ListsController, function($scope) {

//   //TODO: What methods do we need?

// })
