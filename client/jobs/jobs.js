angular.module("crowdcart.jobs", [])

.controller("JobsController", function ($scope, Jobs, $window) {

  $scope.data = {};

  $scope.userid = $window.localStorage.getItem('crowdcartuser');

   $scope.getJobs = function() {
    Jobs.getJobs($scope.userid)
      .then(function(jobs){
        $scope.data.jobs = jobs;
        console.log('JOBS: ', jobs);
      })
      .catch(function(error){
        console.log('ERROR: ', error);
      })
  }

  // Initialize Get Jobs Once
  $scope.getJobs();

});

