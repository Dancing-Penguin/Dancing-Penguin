

// create the crowdcart app
angular.module("crowdcart", [
  "crowdcart.auth",
  "crowdcart.lists",
  "crowdcart.services",
  "ngRoute"
])

//config/routing
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'auth/signup.html',
      controller: 'AuthController'
    })
    .when('/mylists', {
      templateUrl: 'lists/mylists.html',
      controller: 'ListsController',
      authenticate: true
    })
    .otherwise({
      redirectTo: '/mylists'
    });
    
    $httpProvider.interceptors.push('AttachTokens');

})

// attachtokens factory

// run directive