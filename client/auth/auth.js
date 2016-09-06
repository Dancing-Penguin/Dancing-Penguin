angular.module('crowdcart.auth', [])// make an auth module

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('crowdcarttoken', token);
        $location.path('/lists');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('crowdcarttoken', token);
        $location.path('/lists');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});

// make and auth controller
// signin - delegate to services to call server
// signup - delegate to services to call server