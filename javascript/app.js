'use strict';

var myApp = angular.module('mainApp', [
	'ngRoute',
	'mainApp.home',
	'mainApp.login',
	'mainApp.html',
	'mainApp.addPost',
	'mainApp.discuss',
	'mainApp.admin'
]);

myApp.config(['$routeProvider', function($routeProvider){
	//Default Route
	$routeProvider.otherwise({
		redirectTo: '/home'
	})
}]);

myApp.controller('mainCtrl', ['$scope','UserService', function($scope, UserService){
	$scope.service = UserService;
	$scope.label = "Login";
	$scope.$watch('service.getUser()', function(newVal) {
		console.log(newVal);
		if(newVal === "failed" || newVal == null || newVal === "")
		{
			$scope.label = "Login";
		}
		else
		{
			$scope.label = "| Hi " + newVal + ", Logout!";
		}
	});
}]);