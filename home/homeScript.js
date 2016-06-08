'use strict'

var homeApp = angular.module('mainApp.home', ['ngRoute', 'firebase']);

//Route
homeApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeCtrl'
    })
}]);

homeApp.controller('homeCtrl', ['$scope','$location','$firebase', '$firebaseArray',function($scope,$location,$firebase, $firebaseArray){
    $scope.pageClass = 'page-animation1';
	var firebaseObj = new Firebase("https://frontend-tuts.firebaseio.com/discuss/");

	$scope.Topics = $firebaseArray(firebaseObj);
}]);