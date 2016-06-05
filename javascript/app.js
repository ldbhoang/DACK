'use strict';

var myApp = angular.module('mainApp', [
	'ngRoute',
	'mainApp.home',
	'mainApp.login'
]);

myApp.config(['$routeProvider', function($routeProvider){
	//Default Route
	$routeProvider.otherwise({
		redirectTo: '/home'
	})
}]);