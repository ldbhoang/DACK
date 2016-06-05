'use strict'

var homeApp = angular.module('mainApp.home', ['ngRoute']);

//Route
homeApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'homeCtrl'
    })
}]);

homeApp.controller('homeCtrl', [function(){

}]);