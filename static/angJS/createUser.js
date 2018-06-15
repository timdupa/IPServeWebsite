var total=0
var app=angular.module("createUserApp",[]);// this was changed from cartApp to menuApp
app.controller('createUserCtrl', function($scope,$http){ //changed from cartCtrl to cartCtrl
    $http({
      method: 'GET',
      url: '/createUser.html'
    }).then(function successCallback(response) {
    $scope.menu=response.data;
  }, function errorCallback(response) {
    $scope.menu=[]
  });
$scope.msg="Registration"

//Whenever the page is loaded, it will pull the data from the menu in DB server

//second: update menu
$scope.createUser=function(item){
    $http({
      method: 'POST',
      url: '/createUser',
      data:item
    }).then(function successCallback(response) {
    $scope.msg="User created. Please click back and sign in.";
  }, function errorCallback(response) {
    $scope.msg="Server Problem, try again later"
  });
}

})