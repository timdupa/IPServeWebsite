var total=0
var app=angular.module("userLogApp",[]);// this was changed from cartApp to menuApp
app.controller('userLogCtrl', function($scope,$http){ //changed from cartCtrl to cartCtrl
    $http({
      method: 'GET',
      url: '/viewUsers'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });
$scope.msg="All Users"

//Whenever the page is loaded, it will pull the data from the menu in DB server

//second: update menu
$scope.updateUsers=function(item){
    $http({
      method: 'POST',
      url: '/updateUsers',
      data:item
    }).then(function successCallback(response) {
    $scope.msg="Updated!";

    $http({
      method: 'GET',
      url: '/viewUsers'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });

  }, function errorCallback(response) {
    $scope.msg="Server Problem, try again later"
  });
}

$scope.deleteUser=function(item){
    $http({
      method: 'POST',
      url: '/deleteUser',
      data:item
    }).then(function successCallback(response) {
    $scope.msg="Deleted";

    $http({
      method: 'GET',
      url: '/viewUsers'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });

  }, function errorCallback(response) {
    $scope.msg="Server Problem, try again later"
  });
}
 })

var app2=angular.module("profileApp",[]);// this was changed from cartApp to menuApp
app2.controller('profileCtrl', function($scope,$http){ //changed from cartCtrl to cartCtrl
    $http({
      method: 'GET',
      url: '/viewProfile'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });
$scope.msg="Profile"

$scope.updateProfile=function(item){
    $http({
      method: 'POST',
      url: '/updateProfile',
      data:item
    }).then(function successCallback(response) {
    $scope.msg="Updated!";

    $http({
      method: 'GET',
      url: '/viewProfile'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });

  }, function errorCallback(response) {
    $scope.msg="Server Problem, try again later"
  });
}
 })