'use strict'

var loginApp = angular.module('mainApp.login', ['ngRoute']);

//Route
homeApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'loginCtrl'
    })
}]);

homeApp.controller('loginCtrl', [function(){
	window.alert("Blabal");

}]);