'use strict'

var loginApp = angular.module('mainApp.login', ['ngRoute','firebase']);

//Route
loginApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'loginCtrl'
    })
}]);

loginApp.controller('loginCtrl', ['$scope','$location','UserService' ,'$firebaseAuth',function($scope,$location,UserService,$firebaseAuth) {	
	var firebaseObj = new Firebase("https://frontend-tuts.firebaseio.com/");
	var authData = firebaseObj.getAuth();
	var authObj = $firebaseAuth(firebaseObj);
	var loggedOut = false;
	if(authData) {
		firebaseObj.unauth();
		$scope.loggedOut = true;
		UserService.setUser("failed");
	}
	
	
	$scope.loguser = {};
	$scope.SignIn = function(e) {
		e.preventDefault();
		var username = $scope.user.logemail;
		var password = $scope.user.logpassword;
		authObj.$authWithPassword({
				email: username,
				password: password
			})
			.then(function(user) {
				//Success callback
				console.log('Authentication successful');
				UserService.setUser(username);
				$location.path('/home');				
			}, function(error) {
				//Failure callback
				console.log('Authentication failure');
			});
	};
	
	$scope.signUp = function() {
		if (!$scope.regForm.$invalid) {
			var email = $scope.user.regemail;
			var password = $scope.user.regpassword;
			if (email && password) {
				authObj.$createUser({email : email, password : password})
					.then(function() {
						// do things if success
						console.log('User creation success');
						authObj.$authWithPassword({
							email: email,
							password: password
						})
						.then(function(user) {
							//Success callback
							console.log('Authentication successful');
							UserService.setUser(email);
							$location.path('/home');
						}, function(error) {
							//Failure callback
							console.log('Authentication failure');
						});
					}, function(error) {
						// do things if failure
						console.log(error);
						$scope.regError = true;
						$scope.regErrorMessage = error.message;
					});
			}
		}
	};
}]);

loginApp.service('UserService', function() {
    var user = '';
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
});