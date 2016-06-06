'use strict'

var htmlApp = angular.module('mainApp.html', ['ngRoute','firebase']);

//Route
htmlApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/htmlTuts-:id', {
        templateUrl: 'htmlTuts/htmlTuts.html',
        controller: 'htmlCtrl'
    })
}]);

htmlApp.controller('htmlCtrl', ['$scope', '$firebase', '$firebaseArray', function($scope, $firebase, $firebaseArray){
	var fb = new Firebase("https://frontend-tuts.firebaseio.com/htmlTuts");
	$scope.tuts = $firebaseArray(fb);
}]);