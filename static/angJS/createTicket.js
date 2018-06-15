var total=0
var app=angular.module("createTicketApp",[]);// this was changed from cartApp to menuApp
app.controller('createTicketCtrl', function($scope,$http){ //changed from cartCtrl to cartCtrl
    $http({
      method: 'GET',
      url: '/createTicket.html'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });
$scope.msg="Create Ticket"

//Whenever the page is loaded, it will pull the data from the menu in DB server

//second: update
$scope.createTicket=function(item){
    $http({
      method: 'POST',
      url: '/createTicket',
      data:item
    }).then(function successCallback(response) {
    $scope.msg="Ticket Created. Check Your Tickets";

    $http({
      method: 'GET',
      url: '/home.html'
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