'use strict';

var myApp = angular.module('mainApp', [
	'ngRoute',
	'mainApp.home'
]);

myApp.config(['$routeProvider', function($routeProvider){
	//Website Route
	
	//Default Route
	$routeProvider.otherwise({
		redirectTo: '/home'
	})
}]);