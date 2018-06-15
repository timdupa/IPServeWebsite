var total=0
var app=angular.module("ticketLogApp",[]);// this was changed from cartApp to menuApp
app.controller('ticketLogCtrl', function($scope,$http){ //changed from cartCtrl to cartCtrl
    $http({
      method: 'GET',
      url: '/viewTickets'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });
$scope.msg="Tickets"

//Whenever the page is loaded, it will pull the data from the menu in DB server

//second: update menu
$scope.updateTickets=function(item){
    $http({
      method: 'POST',
      url: '/updateTickets',
      data:item
    }).then(function successCallback(response) {
    $scope.msg="Updated!";

    $http({
      method: 'GET',
      url: '/viewTickets'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });

  }, function errorCallback(response) {
    $scope.msg="Server Problem, try again later"
  });
}

$scope.deleteTickets=function(item){
    $http({
      method: 'POST',
      url: '/deleteTickets',
      data:item
    }).then(function successCallback(response) {
    $scope.msg="Closed";

    $http({
      method: 'GET',
      url: '/viewTickets'
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

var app2=angular.module("yourTicketsApp",[]);// this was changed from cartApp to menuApp
app2.controller('yourTicketsCtrl', function($scope,$http){ //changed from cartCtrl to cartCtrl
    $http({
      method: 'GET',
      url: '/viewYourTickets'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });
$scope.msg="Your Tickets"

$scope.updateYourTickets=function(item){
    $http({
      method: 'POST',
      url: '/updateYourTickets',
      data:item
    }).then(function successCallback(response) {
    $scope.msg="Updated!";

    $http({
      method: 'GET',
      url: '/viewYourTickets'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });

  }, function errorCallback(response) {
    $scope.msg="Server Problem, try again later"
  });
}
$scope.deleteYourTickets=function(item){
    $http({
      method: 'POST',
      url: '/deleteYourTickets',
      data:item
    }).then(function successCallback(response) {
    $scope.msg="Closed";

    $http({
      method: 'GET',
      url: '/viewYourTickets'
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