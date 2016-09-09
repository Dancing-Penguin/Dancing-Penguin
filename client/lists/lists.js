angular.module("crowdcart.lists", ["angularMoment"])

.controller("ListsController", function ($scope, Lists, $window, $location, $rootScope, $routeParams, $interval) {

  // storage objs
  $scope.data = {};
  $scope.list = {};
  $scope.list.delivery_address = {};
  $scope.list.items = [];

  // date
  $scope.timeUntil = function (time) {
    return new Date(time) - new Date()
  }

  // store userid into local storage (same level as auth token)
  $scope.userid = $window.localStorage.getItem('crowdcartuser');

  var initialize = function () {
    // console.log('userId: ',$scope.userid)
    // console.log($rootScope)

    // is routePararms exists it means directed here via URL
    if ($routeParams.listid) {
      Lists.getOneList($routeParams.listid)
        .then(function (list) {
          $scope.displayList = list
        })
    }

    //Get all lists belong to user
    Lists.getLists($scope.userid)
      .then(function (lists) {
        $scope.data.lists = lists;
      })
      .catch(function (error) {
        console.error(error);
      });

    //Get all lists the do not have deliverer and do not belong to user
    Lists.getAllList()
      .then(function(allLists){
        $scope.data.allLists = allLists.filter(function(list){
          //Only showing the list that has not deliverer, and those that do not belong to user
          return (!list.deliverer_id || list.deliverer_id === '') && list.creator_id !== $scope.userid;
        });
        // console.log('ALL LISTS: ', allLists);
      })
      .catch(function(error){
        console.error(error);
      });

  };

  $scope.displayDetail = function(listid) {
    // simple redirect
    $location.path("/listdetail/" + listid)
  }

  //add new list method, will be attached into createnewlist.html
  $scope.addList = function () {
    $scope.list.creator_id = $scope.userid;
    // Defaulting deliverer_id to empty string
    $scope.list.deliverer_id = '';
    // console.log('list', $scope.list);
    Lists.newList($scope.list)
      .then(function () {
        console.log('rediction');
        $location.path('/alllist.html');
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  //Add a job, update the deliverer id to user's id
  $scope.addJob = function(list) {

    // Prefix 786 for all new jobs
    // Note: Prior to this method.. deliverer_id = userid
    // causing issues where every list was being displayed
    // in My Jobs
    list.deliverer_id = '786' + $scope.userid;

    // Update DB list with new deliverer_id
    Lists.updateList(list)
      .then(function () {
        console.log("add job", list)
        $location.path('/myjobs');
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  initialize();

});

// .controller(ListsController, function($scope) {

//   //TODO: What methods do we need?

// })
